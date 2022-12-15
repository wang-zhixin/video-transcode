// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs/promises';
import type { NextApiRequest, NextApiResponse } from 'next';
// import FnFClient, { StartExecutionResponse } from '@alicloud/fnf-2019-03-15';
type Data = {
  success: boolean;
  percentage?: number;
  lastFrame?: any;
  frames?: any;
  msg?: string;
  size?: number;
  updaetTime?: string
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (typeof req.query.videoId === 'string') {
    const videoId = req.query.videoId;
    try {
      const [frames, progress, stat] = await Promise.all([
        fs.readFile('/mnt/auto/video-transcode/' + videoId + '/frames.txt'),
        fs.readFile('/mnt/auto/video-transcode/' + videoId + '/progress-log.txt'),
        fs.stat('/mnt/auto/video-transcode/' + videoId + '/progress-log.txt'),
      ]);
      const matchs = progress.toString().match(/frame=\d+/g);
      if (matchs) {
        const lastFrame = matchs[matchs.length - 1].split('=')[1];
        let percentage = (Number(lastFrame) / Number(frames.toString())) * 100;
        if (percentage > 100) {
          percentage = 100;
        }
        res
          .status(200)
          .json({
            success: true,
            size: progress.byteLength,
            percentage: Math.floor(percentage),
            lastFrame,
            updaetTime: stat.mtime.toString(),
            frames: frames.toString().trim(),
          });
      } else {
        res.status(200).json({ success: false });
      }
    } catch (error) {
      res.status(200).json({ success: false, msg: 'readFile error' });
    }
  } else {
    res.status(404).end();
  }
}
