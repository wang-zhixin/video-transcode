import { Settings } from "$/blocks/video/options";

export default function buildFFmpegCommand(settings: Settings): string[] {
  const commands = [];
  if(settings.format !== 'mp3') {
    if(settings.size) {
      commands.push(`-vf`, `scale=${settings.size}`);
    }
    if(settings.videoBitrate) {
      commands.push(`-b:v`, `${settings.videoBitrate}`);
    }
    if(settings.framerate) {
      commands.push(`-r`, `${settings.framerate}`);
    }
    if(settings.aspect) {
      commands.push(`-aspect`, `${settings.aspect}`);
    }
    if(settings.videoRotate) {
      let str = new Array(Number(settings.videoRotate) / 90).fill(0).map(() => {
        return 'transpose=1'
      }).join(',')
      commands.push(`-vf`, str);
    }
  }
  if(settings.audioBitrate) {
    commands.push(`-b:a`, `${settings.audioBitrate}`);
  }
  return commands
}