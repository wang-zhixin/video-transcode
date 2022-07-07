// 生成获取执行的状态的请求url
import kitx from 'kitx';
function build(ExecutionName: string, FlowName: string) {
  const defaultParams = {
    Format: 'JSON',
    SignatureMethod: 'HMAC-SHA1',
    SignatureNonce: kitx.makeNonce(),
    SignatureVersion: '1.0',
    Timestamp: timestamp(),
    AccessKeyId: process.env.ALI_ACCESSKEY_ID,
    Version: '2019-03-15',
    Action: 'DescribeExecution',
    FlowName: FlowName || 'video-transcode-flow',
    ExecutionName: ExecutionName,
    WaitTimeSeconds: 5,
  };

  const accessKeySecret = process.env.ALI_ACCESSKEY_SECRET;
  const params = Object.assign({}, defaultParams);
  const method = 'GET';
  const normalized = normalize(params);
  const canonicalized = canonicalize(normalized);
  const stringToSign = `${method}&${encode('/')}&${encode(canonicalized)}`;
  const endpoint = `https://${process.env.ALI_ACCOUNT_ID}.${process.env.ALI_REGION}.fnf.aliyuncs.com`;
  // 2.2 get signature
  const key = accessKeySecret + '&';
  const signature = kitx.sha1(stringToSign, key, 'base64');
  normalized.push(['Signature', encode(signature)]);
  const url = `${endpoint}/?${canonicalize(normalized)}`;
  return url;
}
function timestamp() {
  var date = new Date();
  var YYYY = date.getUTCFullYear();
  var MM = kitx.pad2(date.getUTCMonth() + 1);
  var DD = kitx.pad2(date.getUTCDate());
  var HH = kitx.pad2(date.getUTCHours());
  var mm = kitx.pad2(date.getUTCMinutes());
  var ss = kitx.pad2(date.getUTCSeconds());
  // 删除掉毫秒部分
  return `${YYYY}-${MM}-${DD}T${HH}:${mm}:${ss}Z`;
}
function encode(str: any) {
  var result = encodeURIComponent(str);

  return result
    .replace(/!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A');
}

function replaceRepeatList(target: any, key: string, repeat: any[]) {
  for (var i = 0; i < repeat.length; i++) {
    var item = repeat[i];

    if (item && typeof item === 'object') {
      const keys = Object.keys(item);
      for (var j = 0; j < keys.length; j++) {
        target[`${key}.${i + 1}.${keys[j]}`] = item[keys[j]];
      }
    } else {
      target[`${key}.${i + 1}`] = item;
    }
  }
}

function flatParams(params: any) {
  var target: any = {};
  var keys = Object.keys(params);
  for (let i = 0; i < keys.length; i++) {
    var key = keys[i];
    var value = params[key];
    if (Array.isArray(value)) {
      replaceRepeatList(target, key, value);
    } else {
      target[key] = value;
    }
  }
  return target;
}

function normalize(params: any) {
  var list = [];
  var flated = flatParams(params);
  var keys = Object.keys(flated).sort();
  for (let i = 0; i < keys.length; i++) {
    var key = keys[i];
    var value = flated[key];
    list.push([encode(key), encode(value)]); //push []
  }
  return list;
}

function canonicalize(normalized: any) {
  var fields = [];
  for (var i = 0; i < normalized.length; i++) {
    var [key, value] = normalized[i];
    fields.push(key + '=' + value);
  }
  return fields.join('&');
}

export default build;
