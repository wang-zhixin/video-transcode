type OptionsValue<T> = T extends ReadonlyArray<{ value: infer U }> ? U : never;

export const sizeOptions = [
  {
    label: '保持原样',
    value: '',
  },
  {
    label: '160x112',
    value: '160x112',
  },
  {
    label: '176x144',
    value: '176x144',
  },
  {
    label: '220x176',
    value: '220x176',
  },
  {
    label: '320x240',
    value: '320x240',
  },
  {
    label: '352x240',
    value: '352x240',
  },
  {
    label: '352x288',
    value: '352x288',
  },
  {
    label: '368x208',
    value: '368x208',
  },
  {
    label: '480x272',
    value: '480x272',
  },
  {
    label: '480x320',
    value: '480x320',
  },
  {
    label: '480x480',
    value: '480x480',
  },
  {
    label: '480x576',
    value: '480x576',
  },
  {
    label: '512x384',
    value: '512x384',
  },
  {
    label: '640x480(480p)',
    value: '640x480',
  },
  {
    label: '720x480',
    value: '720x480',
  },
  {
    label: '720x576',
    value: '720x576',
  },
  {
    label: '1080x720(720p)',
    value: '1080x720',
  },
  {
    label: '1440x1080',
    value: '1440x1080',
  },
  {
    label: '1920x1080(1080p)',
    value: '1920x1080',
  },
  {
    label: '1920x1200',
    value: '1920x1200',
  },
  {
    label: '2048x1536',
    value: '2048x1536',
  },
  {
    label: '2560x1440',
    value: '2560x1440',
  },
  {
    label: '2560x1600',
    value: '2560x1600',
  },
  {
    label: '3840x2160',
    value: '3840x2160',
  },
] as const;

export type SizeValue = OptionsValue<typeof sizeOptions>;
export const formatOptions = [
  // {
  //   label: '保持原样',
  //   value: '',
  // },
  {
    label: 'mp4',
    value: 'mp4',
  },
  {
    label: 'mp3',
    value: 'mp3',
  },
  {
    label: 'avi',
    value: 'avi',
  },
  {
    label: 'mpg',
    value: 'mpg',
  },
  {
    label: 'mkv',
    value: 'mkv',
  },
  {
    label: 'wmv',
    value: 'wmv',
  },
  {
    label: 'm2ts',
    value: 'm2ts',
  },
  {
    label: 'webm',
    value: 'webm',
  },
  {
    label: 'flv',
    value: 'flv',
  },
  {
    label: 'asf',
    value: 'asf',
  },
  {
    label: 'mov',
    value: 'mov',
  },
  {
    label: 'm4v',
    value: 'm4v',
  },
  {
    label: 'rm',
    value: 'rm',
  },
  {
    label: 'vob',
    value: 'vob',
  },
  {
    label: 'ogv',
    value: 'ogv',
  },
  {
    label:'m4a',
    value:'m4a',
  },
  {
    label: 'gif',
    value: 'gif',
  },
] as const;

export type FormatValue = OptionsValue<typeof formatOptions>;

export const bitrateOptions = [
  {
    label: '保持原样',
    value: '',
  },
  {
    label: '64k',
    value: '64k',
  },
  {
    label: '96k',
    value: '96k',
  },
  {
    label: '112k',
    value: '112k',
  },
  {
    label: '128k',
    value: '128k',
  },
  {
    label: '160k',
    value: '160k',
  },
  {
    label: '192k',
    value: '192k',
  },
  {
    label: '256k',
    value: '256k',
  },
  {
    label: '384k',
    value: '384k',
  },
  {
    label: '512k',
    value: '512k',
  },
  {
    label: '768k',
    value: '768k',
  },
  {
    label: '1024k',
    value: '1024k',
  },
  {
    label: '2000k',
    value: '2000k',
  },
  {
    label: '4000k',
    value: '4000k',
  },
  {
    label: '5000k',
    value: '5000k',
  },
  {
    label: '6000k',
    value: '6000k',
  },
  {
    label: '8000k',
    value: '8000k',
  },
  {
    label: '10000k',
    value: '10000k',
  },
  {
    label: '12000k',
    value: '12000k',
  },
] as const;
export type BitrateValue = OptionsValue<typeof bitrateOptions>;

const framerateOptions = [
  {
    label: '保持原样',
    value: '',
  },
  {
    label: '8',
    value: '8',
  },
  {
    label: '10',
    value: '10',
  },
  {
    label: '12',
    value: '12',
  },
  {
    label: '15',
    value: '15',
  },
  {
    label: '20',
    value: '20',
  },
  {
    label: '23.976',
    value: '23.976',
  },
  {
    label: '24',
    value: '24',
  },
  {
    label: '25',
    value: '25',
  },
  {
    label: '29.97',
    value: '29.97',
  },
  {
    label: '30',
    value: '30',
  },
  {
    label: '50',
    value: '50',
  },
  {
    label: '60',
    value: '60',
  },
] as const;

export type FramerateValue = OptionsValue<typeof framerateOptions>;

const aspectOptions = [
  {
    label: '保持原样',
    value: '',
  },
  {
    label: '4:3',
    value: '4:3',
  },
  {
    label: '16:9',
    value: '16:9',
  },
  {
    label: '16:10',
    value: '16:10',
  },
  {
    label: '1.85:1',
    value: '1.85:1',
  },
  {
    label: '2.35:1',
    value: '2.35:1',
  },
  {
    label: '2.39:1',
    value: '2.39:1',
  },
] as const;

export type AspectValue = OptionsValue<typeof aspectOptions>;

const audioBitrateOptions = [
  {
    label: '保持原样',
    value: '',
  },
  {
    label: '32k',
    value: '32k',
  },
  {
    label: '64k',
    value: '64k',
  },
  {
    label: '96k',
    value: '96k',
  },
  {
    label: '128k',
    value: '128k',
  },
  {
    label: '160k',
    value: '160k',
  },
  {
    label: '192k',
    value: '192k',
  },
  {
    label: '256k',
    value: '256k',
  },
  {
    label: '384k',
    value: '384k',
  },
  {
    label: '512k',
    value: '512k',
  },
] as const;
/**
 *  "保持原样",
  "90",
  "180",
  "270",
 */
const videoRotateOptions = [
  {
    label: '保持原样',
    value: '',
  },
  {
    label: '90度',
    value: '90',
  },
  {
    label: '180度',
    value: '180',
  },
  {
    label: '270度',
    value: '270',
  },
] as const;

const transcodeTypeOptions = [
  {
    label: '云端转换(推荐)',
    value: 'cloud',
  },
  {
    label: '本地转换',
    value: 'local',
  }
] as const;
const options = {
  format: {
    i18nName: 'format',
    label: (text: string) => text,
    options: formatOptions,
  },
  // size: {
  //   label: '视频尺寸',
  //   options: sizeOptions,
  // },
  // videoBitrate: {
  //   label: '视频比特率',
  //   options: bitrateOptions,
  // },
  // framerate: {
  //   label: '视频帧率',
  //   options: framerateOptions,
  // },
  // aspect: {
  //   label: '视频比例',
  //   options: aspectOptions,
  // },
  // audioBitrate: {
  //   label: '音频比特率',
  //   options: audioBitrateOptions,
  // },
  // videoRotate: {
  //   label: '视频旋转',
  //   options: videoRotateOptions,
  // },
} as const;

// type GetOptionValue<T> = T extends keyof typeof options ? OptionsValue<typeof options[T]['options']> : never;

export type GetOptionValue<T> = T extends keyof typeof options
  ? typeof options[T] extends { options: infer U }
    ? OptionsValue<U>
    : never
  : never;

export type Settings = {
  [T in keyof typeof options]: GetOptionValue<T>;
};
export type OptionKey = keyof typeof options;

export default options;
