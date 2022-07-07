
export type ProgressType = React.PropsWithChildren<{}> & {
  percent: number
}
const Progress = (props: ProgressType) => {
  return (
    <div className="bg-gray-200 rounded-full">
      <div className="h-2 rounded-full bg-blue-400 transition-all duration-300" style={{width: props.percent + '%'}}></div>
    </div>
  )
}

export default Progress