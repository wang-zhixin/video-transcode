// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import jwt  from 'jsonwebtoken'
type Data = {
  success: boolean;
  data: {
    openid: string;
    token: string
  }
};
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.query.platform === 'douyin' && req.query.code) {
    console.log('process.env.DOUYIN_APPID', process.env.DOUYIN_APPID)
    const response = await fetch(
      `https://developer.toutiao.com/api/apps/v2/jscode2session`,
      {
        method: 'POST',
        body: JSON.stringify({
          appid: process.env.DOUYIN_APPID,
          secret: process.env.DOUYIN_APPSECRET,
          code: req.query.code
        })
      }
    );
    const json = await response.json();
    if(json.err_no === 0) {
      const token = jwt.sign({
        dyOpenid: json.openid,
        createAt: Date.now()
      }, process.env.JWT_KEY, {
        expiresIn: '30 days',
      })
      res.status(200).json({
        success: true,
        data: {
          openid: json.data.openid,
          token
        }
      });
    } else {
      res.status(400)
      res.write(json.err_tips)
      res.end()
    }
  } else {
    res.status(400)
    res.end()
  }
}
