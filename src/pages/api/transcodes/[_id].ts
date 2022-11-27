// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import { getCloudBaseApp } from '$/server/common/cloudbase'
import { getOssClient } from '$/server/common/oss'
import { getCdnClient } from '$/server/common/cdn'
type Data = any
const cors = Cors({
  methods: ['DELETE'],
})
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await runMiddleware(req, res, cors)
  if(req.method === 'DELETE') {
    if(typeof req.query._id === 'string') {
      const cloudbase = getCloudBaseApp()
      const db = cloudbase.database()
      const result = await db.collection('transcodes').doc(req.query._id).get()
      const record = result.data[0]
      if(record) {
        const ossClient = getOssClient()
        const outputKeys: string[] = record.output.map((item: {key: string}) => item.key)
        // 删除OSS文件
        await Promise.all([...outputKeys, record.videoKey].map(key => ossClient.delete(key)))
        // 删除cdn缓存
        await getCdnClient().refreshObjectCaches({
          ObjectPath: outputKeys.map(key => `https://file.ahelpers.com/${key}`).join('\n')
        })
        // 数据库标记
        await db.collection('transcodes').doc(req.query._id).update({
          disabled: true
        })
        res.status(200).end()
      } else {
        res.status(404).end()
      }
    } else {
      res.status(404).end()
    }
  } else {
    res.status(404).end()
  }
}
