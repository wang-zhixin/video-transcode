import type { NextApiRequest } from 'next';

export const getAppInfo = (tenantToken: string) => {
  switch (tenantToken) {
    case "2":
      return {
        appid: process.env.DOUYIN_APPID,
        secret: process.env.DOUYIN_APPSECRET
      }
    case "3": 
      return {
        appid: process.env.DOUYIN_APPID_3,
        secret: process.env.DOUYIN_APPSECRET_3
      }
  
    default:
      return {
        appid: process.env.DOUYIN_APPID,
        secret: process.env.DOUYIN_APPSECRET
      };
  }
}

export const checkDouYinApp = (req: NextApiRequest) => {
  return req.query.platform === 'douyin' || req.headers['x-platform'] === 'douyin'
}