// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import jwt  from 'jsonwebtoken'
import Cors from 'cors'
type Data = any

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
  res: NextApiResponse<Data>
) {
  await runMiddleware(req, res, cors)
  const token = req.headers.authorization
  if(!token) {
    res.status(401)
    res.end()
    return
  }
  try {
    const decoded = jwt.verify(token.split('Bearea ')[1], process.env.JWT_KEY) as jwt.JwtPayload
    if(decoded.dyOpenid) {
      
    }
    res.status(200).json({
      success: true,
      data: decoded
    })
    return
  } catch (error) {
    res.status(401)
    res.end()
    return
  }
  
}
