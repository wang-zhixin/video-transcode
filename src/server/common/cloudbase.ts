import cloudbase, { CloudBase, ICallFunctionRes } from '@cloudbase/node-sdk';
let nodeApp: CloudBase;

/**
 * 获取初始化后的 cloudbase node sdk 实例
 */
export const getCloudBaseApp = () => {
  if (nodeApp) {
    return nodeApp;
  }
  const envId = 'dev-wemjj';

  let options: cloudbase.ICloudBaseConfig = {
    env: envId,
    secretId: process.env['TENCENT_SECRET_ID'],
    secretKey: process.env['TENCENT_SECRET_KEY'],
  };

  const app = cloudbase.init(options);
  nodeApp = app;
  return app;
};
