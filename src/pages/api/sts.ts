// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import OSS, { STS } from 'ali-oss'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OSS.Credentials>
) {
  const sts = new STS({
    accessKeyId: process.env.ALI_ACCESSKEY_ID,
    accessKeySecret: process.env.ALI_ACCESSKEY_SECRET
  })
  const STSpolicy = {
    Statement: [
      {
        Action: ['oss:*'],
        Effect: 'Allow',
        Resource: ['acs:oss:*:*:*']
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
