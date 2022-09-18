type OptionsValue<T> = T extends ReadonlyArray<{ value: infer U }> ? U : never;

export const sizeOptions = [
  {
    label: 'sizeOptions-default',
    value: '',
  },
  {
    label: 'sizeOptions-160x112',
    value: '160x112',
  },
  {
    label: 'sizeOptions-176x144',
    value: '176x144',
  },
  {
    label: 'sizeOptions-220x176',
    value: '220x176',
  },
  {
    label: 'sizeOptions-320x240',
    value: '320x240',
  },
  {
    label: 'sizeOptions-352x240',
    value: '352x240',
  },
  {
    label: 'sizeOptions-352x288',
    value: '352x288',
  },
  {
    label: 'sizeOptions-368x208',
    value: '368x208',
  },
  {
    label: 'sizeOptions-480x272',
    value: '480x272',
  },
  {
    label: 'sizeOptions-480x320',
    value: '480x320',
  },
  {
    label: 'sizeOptions-480x480',
    value: '480x480',
  },
  {
    label: 'sizeOptions-480x576',
    value: '480x576',
  },
  {
    label: 'sizeOptions-512x384',
    value: '512x384',
  },
  {
    label: 'sizeOptions-640x480(480p)',
    value: '640x480',
  },
  {
    label: 'sizeOptions-720x480',
    value: '720x480',
  },
  {
    label: 'sizeOptions-720x576',
    value: '720x576',
  },
  {
    label: 'sizeOptions-1080x720(720p)',
    value: '1080x720',
  },
  {
    label: 'sizeOptions-1440x1080',
    value: '1440x1080',
  },
  {
    label: 'sizeOptions-1920x1080(1080p)',
    value: '1920x1080',
  },
  {
    label: 'sizeOptions-1920x1200',
    value: '1920x1200',
  },
  {
    label: 'sizeOptions-2048x1536',
    value: '2048x1536',
  },
  {
    label: 'sizeOptions-2560x1440',
    value: '2560x1440',
  },
  {
    label: 'sizeOptions-2560x1600',
    value: '2560x1600',
  },
  {
    label: 'sizeOptions-3840x2160',
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
    label: 'formatOptions-mp4',
    value: 'mp4',
  },
  {
    label: 'formatOptions-mp3',
    value: 'mp3',
  },
  {
    label: 'formatOptions-avi',
    value: 'avi',
  },
  {
    label: 'formatOptions-mpg',
    value: 'mpg',
  },
  {
    label: 'formatOptions-mkv',
    value: 'mkv',
  },
  {
    label: 'formatOptions-wmv',
    value: 'wmv',
  },
  {
    label: 'formatOptions-m2ts',
    value: 'm2ts',
  },
  {
    label: 'formatOptions-webm',
    value: 'webm',
  },
  {
    label: 'formatOptions-flv',
    value: 'flv',
  },
  {
    label: 'formatOptions-asf',
    value: 'asf',
  },
  {
    label: 'formatOptions-mov',
    value: 'mov',
  },
  {
    label: 'formatOptions-m4v',
    value: 'm4v',
  },
  {
    label: 'formatOptions-rm',
    value: 'rm',
  },
  {
    label: 'formatOptions-vob',
    value: 'vob',
  },
  {
    label: 'formatOptions-ogv',
    value: 'ogv',
  },
  {
    label:'formatOptions-m4a',
    value:'m4a',
  },
  {
    label: 'formatOptions-gif',
    value: 'gif',
  },
] as const;

export type FormatValue = OptionsValue<typeof formatOptions>;

export const bitrateOptions = [
  {
    label: 'bitrateOptions-default',
    value: '',
  },
  {
    label: 'bitrateOptions-64k',
    value: '64k',
  },
  {
    label: 'bitrateOptions-96k',
    value: '96k',
  },
  {
    label: 'bitrateOptions-112k',
    value: '112k',
  },
  {
    label: 'bitrateOptions-128k',
    value: '128k',
  },
  {
    label: 'bitrateOptions-160k',
    value: '160k',
  },
  {
    label: 'bitrateOptions-192k',
    value: '192k',
  },
  {
    label: 'bitrateOptions-256k',
    value: '256k',
  },
  {
    label: 'bitrateOptions-384k',
    value: '384k',
  },
  {
    label: 'bitrateOptions-512k',
    value: '512k',
  },
  {
    label: 'bitrateOptions-768k',
    value: '768k',
  },
  {
    label: 'bitrateOptions-1024k',
    value: '1024k',
  },
  {
    label: 'bitrateOptions-2000k',
    value: '2000k',
  },
  {
    label: 'bitrateOptions-4000k',
    value: '4000k',
  },
  {
    label: 'bitrateOptions-5000k',
    value: '5000k',
  },
  {
    label: 'bitrateOptions-6000k',
    value: '6000k',
  },
  {
    label: 'bitrateOptions-8000k',
    value: '8000k',
  },
  {
    label: 'bitrateOptions-10000k',
    value: '10000k',
  },
  {
    label: 'bitrateOptions-12000k',
    value: '12000k',
  },
] as const;
export type BitrateValue = OptionsValue<typeof bitrateOptions>;

export const framerateOptions = [
  {
    label: 'framerateOptions-default',
    value: '',
  },
  {
    label: 'framerateOptions-8',
    value: '8',
  },
  {
    label: 'framerateOptions-10',
    value: '10',
  },
  {
    label: 'framerateOptions-12',
    value: '12',
  },
  {
    label: 'framerateOptions-15',
    value: '15',
  },
  {
    label: 'framerateOptions-20',
    value: '20',
  },
  {
    label: 'framerateOptions-23.976',
    value: '23.976',
  },
  {
    label: 'framerateOptions-24',
    value: '24',
  },
  {
    label: 'framerateOptions-25',
    value: '25',
  },
  {
    label: 'framerateOptions-29.97',
    value: '29.97',
  },
  {
    label: 'framerateOptions-30',
    value: '30',
  },
  {
    label: 'framerateOptions-50',
    value: '50',
  },
  {
    label: 'framerateOptions-60',
    value: '60',
  },
] as const;

export type FramerateValue = OptionsValue<typeof framerateOptions>;

export const aspectOptions = [
  {
    label: 'aspectOptions-default',
    value: '',
  },
  {
    label: 'aspectOptions-4:3',
    value: '4:3',
  },
  {
    label: 'aspectOptions-16:9',
    value: '16:9',
  },
  {
    label: 'aspectOptions-16:10',
    value: '16:10',
  },
  {
    label: 'aspectOptions-1.85:1',
    value: '1.85:1',
  },
  {
    label: 'aspectOptions-2.35:1',
    value: '2.35:1',
  },
  {
    label: 'aspectOptions-2.39:1',
    value: '2.39:1',
  },
] as const;

export type AspectValue = OptionsValue<typeof aspectOptions>;

export const audioBitrateOptions = [
  {
    label: 'audioBitrateOptions-default',
    value: '',
  },
  {
    label: 'audioBitrateOptions-32k',
    value: '32k',
  },
  {
    label: 'audioBitrateOptions-64k',
    value: '64k',
  },
  {
    label: 'audioBitrateOptions-96k',
    value: '96k',
  },
  {
    label: 'audioBitrateOptions-128k',
    value: '128k',
  },
  {
    label: 'audioBitrateOptions-160k',
    value: '160k',
  },
  {
    label: 'audioBitrateOptions-192k',
    value: '192k',
  },
  {
    label: 'audioBitrateOptions-256k',
    value: '256k',
  },
  {
    label: 'audioBitrateOptions-384k',
    value: '384k',
  },
  {
    label: 'audioBitrateOptions-512k',
    value: '512k',
  },
] as const;
/**
 *  "保持原样",
  "90",
  "180",
  "270",
 */
export const videoRotateOptions = [
  {
    label: 'videoRotateOptions-default',
    value: '',
  },
  {
    label: 'videoRotateOptions-90度',
    value: '90',
  },
  {
    label: 'videoRotateOptions-180度',
    value: '180',
  },
  {
    label: 'videoRotateOptions-270度',
    value: '270',
  },
] as const;

const transcodeTypeOptions = [
  {
    label: 'transcodeTypeOptions-cloud',
    value: 'cloud',
  },
  {
    label: 'transcodeTypeOptions-local',
    value: 'local',
  }
] as const;
const options = {
  format: {
    label: 'options-format',
    options: formatOptions,
  },
  size: {
    label: 'options-size',
    options: sizeOptions,
  },
  videoBitrate: {
    label: 'options-videoBitrate',
    options: bitrateOptions,
  },
  framerate: {
    label: 'options-framerate',
    options: framerateOptions,
  },
  aspect: {
    label: 'options-aspect',
    options: aspectOptions,
  },
  audioBitrate: {
    label: 'options-audioBitrate',
    options: audioBitrateOptions,
  },
  videoRotate: {
    label: 'options-videoRotate',
    options: videoRotateOptions,
  },
  transcodeType: {
    label: 'options-transcodeType',
    options: transcodeTypeOptions
  }
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
