import RPCClient from '@alicloud/pop-core';

class Client extends RPCClient {
  constructor(config: RPCClient.Config) {
    super(config);
  }

  /** 刷新url
   * @param {String} ObjectPath - ObjectPath. required .
   * @param {String} ObjectType - ObjectType. optional.
   */
  refreshObjectCaches(params = {}, options = {}) {
    return this.request('RefreshObjectCaches', params, options);
  }
}

let client: Client

export const getCdnClient = () => {
  if(client) {
    return client
  } 
  client = new Client({
    apiVersion: '2018-05-10',
    accessKeyId: process.env.ALI_ACCESSKEY_ID,
    accessKeySecret: process.env.ALI_ACCESSKEY_SECRET,
    endpoint: `https://cdn.aliyuncs.com`,
  });
  return client
}

