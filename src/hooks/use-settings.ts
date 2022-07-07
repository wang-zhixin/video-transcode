import { useState, useEffect } from 'react';
import type { Settings } from '$/blocks/video/options';
// type Settings = {
//   size: SizeValue;
//   format: FormatValue;
//   videoBitrate: BitrateValue;
//   framerate: FramerateValue;
// };

const useSettings = () => {
  const [settings, setSettings] = useState<Settings>({
    size: '',
    format: 'mp4',
    videoBitrate: '',
    framerate: '',
    aspect: '',
    audioBitrate: '',
    videoRotate: '',
  });
  const setSetting = (
    name: keyof Settings,
    value: Settings[keyof Settings]
  ) => {
    setSettings({ ...settings, [name]: value });
  };
  return {
    settings,
    setSetting,
  };
};

export default useSettings;
