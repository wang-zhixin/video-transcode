import OSS from 'ali-oss';

let ossClient: OSS;

type prefix = string;
const uploadFile = async (
  name: prefix,
  file: File,
  options?: OSS.PutObjectOptions | undefined
) => {
  if (!ossClient) {
    const res = await fetch('/api/sts');
    const json: OSS.Credentials = await res.json();
    ossClient = new OSS({
      accessKeyId: json.AccessKeyId,
      accessKeySecret: json.AccessKeySecret,
      stsToken: json.SecurityToken,
      refreshSTSToken: async () => {
        const res = await fetch('/api/sts');
        const json: OSS.Credentials = await res.json();
        return {
          accessKeyId: json.AccessKeyId,
          accessKeySecret: json.AccessKeySecret,
          stsToken: json.SecurityToken,
        };
      },
      region: 'oss-cn-beijing',
      bucket: 'my-pc-test',
    });
  }
  if (file.size < 1024 * 1024 * 10) {
    return ossClient.put(name, file, options);
  } else {
  }
};

export { uploadFile };
