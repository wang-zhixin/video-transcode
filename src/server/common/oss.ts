import OSS from 'ali-oss'

let client:OSS

export const getOssClient = () => {
  if(client) {
    return client
  } 
  client = new OSS({
    region: 'oss-cn-beijing',
    accessKeyId: process.env.ALI_ACCESSKEY_ID,
    accessKeySecret: process.env.ALI_ACCESSKEY_SECRET,
    bucket: 'my-pc-test',
  });
  return client
}