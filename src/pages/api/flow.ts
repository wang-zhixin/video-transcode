// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import FnFClient, { StartExecutionResponse } from '@alicloud/fnf-2019-03-15';
import Cors from 'cors'
import jwt  from 'jsonwebtoken'
import buildDescribeExecutionUrl from '$/utils/flow';

type FlowInput = {
  bucketName: string;
  videoKey: string;
  duration: string | number;
  size: string | number;
  segmentTimeSeconds: number;
  dst_formats: string[];
  [key: string]: any;
};
type OutputItem = {
  key: string;
  size: string | number;
};
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
  res: NextApiResponse<
    Partial<StartExecutionResponse> & { DescribeExecutionUrl?: string } & {
      output?: OutputItem[];
    }
  >
) {
  await runMiddleware(req, res, cors)
  if (req.method === 'GET') {
    const { name, flowName } = req.query;
    if (!name || !flowName) {
      res.status(400);
      return;
    }
    const DescribeExecutionUrl = buildDescribeExecutionUrl(
      name as string,
      flowName as string
    );
    const response = await fetch(DescribeExecutionUrl);
    const data = await response.json();
    res.status(200).json({
      status: data.Status,
      output: data.Output
        ? JSON.parse(data.Output).output.map((item: OutputItem) => ({
            key: item.key,
            size: item.size,
            url: `https://${process.env.ALI_BUCKET_NAME}.oss-${process.env.ALI_REGION}.aliyuncs.com/${item.key}`,
          }))
        : [],
    });
    return;
  }
  if (req.method === 'POST') {
    const client = new FnFClient({
      endpoint: `https://${process.env.ALI_ACCOUNT_ID}.${process.env.ALI_REGION}.fnf.aliyuncs.com`,
      accessKeyId: process.env.ALI_ACCESSKEY_ID,
      accessKeySecret: process.env.ALI_ACCESSKEY_SECRET,
    });
    const body = JSON.parse(req.body);
    const headers = req.headers
    const options = body.options || {};
    // 取消
    if(body.Name || body.FlowName) {
      return await client.stopExecution({
        FlowName: body.FlowName,
        ExecutionName: body.Name,
        Cause: 'user abort',
      })
    }
    const token = headers.authorization
    let dyOpenid = ''
    if(token) {
      try {
        const decoded = jwt.verify(token.split('Bearea ')[1], process.env.JWT_KEY) as jwt.JwtPayload
        if(decoded.dyOpenid) {
          dyOpenid = decoded.dyOpenid
        }
      } catch (error) {
        console.log(error)
        res.status(401).end()
        return
      }
    }
    const Input: FlowInput = {
      bucketName: process.env.ALI_BUCKET_NAME,
      videoKey: body.videoKey,
      duration: body.duration,
      size: body.size,
      segmentTimeSeconds: 30,
      dst_formats: body.targetType,
      fileName: body.fileName,
      platform: headers['x-platform'] || '',
      dyOpenid,
      tenant: headers['x-tenant-token'] || '',
      ...options,
      // muted: options.muted,
    };
    let FlowName = 'video-transcode-common2-flow'
    if(body.targetType.indexOf('mp3') > -1) {
      FlowName = 'video-processing-mp3-fc-flow'
    }
    const startExecutionRes = await client.startExecution({
      FlowName: FlowName,
      Input: JSON.stringify(Input),
    });
    const DescribeExecutionUrl = buildDescribeExecutionUrl(
      startExecutionRes.Name,
      startExecutionRes.FlowName
    );
    res.status(200).json({
      Name: startExecutionRes.Name,
      FlowName: startExecutionRes.FlowName,
      DescribeExecutionUrl
    });
  }
}

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
