// 获取文件后缀名
export function getFileExt(fileName: string): string {
  return fileName.split('.').pop() || '';
}
/**
 * videoKey: videoKey,
          targetType: transcodeOptions.targetFormats || ['mp4'],
          transcodeOptions,
          duration: task.input.duration,
          size: task.input.size,
          width: task.input.width,
          height: task.input.height,
 */
