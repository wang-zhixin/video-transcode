import type { NextApiRequest, NextApiResponse } from 'next'
import cloudbase from '@cloudbase/node-sdk'
import jwt  from 'jsonwebtoken'
type Data = any



const app = cloudbase.init({
  secretId: process.env['TENCENT_SECRET_ID'],
  secretKey: process.env['TENCENT_SECRET_KEY'],
  env: 'dev-wemjj',
});
const db = app.database();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if(!req.query.id) {
    res.status(404)
    res.end()
    return
  }
  const token = req.headers.authorization
  if(!token) {
    res.status(401)
    res.end()
    return
  }
  try {
    const decoded = jwt.verify(token.split('Bearea ')[1], process.env.JWT_KEY) as jwt.JwtPayload
    if(decoded.dyOpenid) {
      const result = await db.collection('transcodes').where({
        _id: req.query.id,
        dyOpenid: decoded.dyOpenid
      }).get()
      if(result) {
        res.status(200).json(result)
      } else {
        res.status(404)
      }
    }
    return
  } catch (error) {
    res.status(401)
    res.end()
    return
  }
}
