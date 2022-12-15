// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type experiment = {
  progress: {
    enable: boolean;
    interval: number
  }
}
type Data = {
  maxSize: number;
  isVip: boolean;
  experiment: experiment;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ 
    maxSize: 1024 * 1024 * 100,
    isVip: false,
    experiment: {
      progress: {
        enable: true,
        interval: 5000
      }
    }
   })
}
