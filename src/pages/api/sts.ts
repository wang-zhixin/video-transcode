// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import OSS, { STS } from 'ali-oss'
import Cors from 'cors'

const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
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
  res: NextApiResponse<OSS.Credentials>
) {
  await runMiddleware(req, res, cors)
  const sts = new STS({
    accessKeyId: process.env.ALI_ACCESSKEY_ID,
    accessKeySecret: process.env.ALI_ACCESSKEY_SECRET
  })
  const STSpolicy = {
    Statement: [
      {
        Action: ['oss:PutObject', 'oss:PostObject', 'oss:GetObject', 'oss:InitiateMultipartUpload', 'oss:UploadPart', 'oss:CompleteMultipartUpload', 'oss:AbortMultipartUpload', 'oss:UploadPartCopy'],
        Effect: 'Allow',
        Resource: ['acs:oss:oss-' + process.env.ALI_REGION+ ':' + process.env.ALI_ACCOUNT_ID + ':' + process.env.ALI_BUCKET_NAME + '/*'],
      }
    ],
    Version: '1'
  };
  try {
    const {credentials} = await sts.assumeRole('acs:ram::' + process.env.ALI_ACCOUNT_ID + ':role/ramosstest', STSpolicy, 3600)
    res.status(200).json(credentials)
  } catch (error) {
    throw error
  }
  
}
