import { useState } from "react"
import DayTimeline from "../containers/DayTimeline"
import WeekTimeline from "../containers/WeekTimeline"
import MonthTimeline from "../containers/MonthTimeline"
import TimelineHeader from "../ui/TimelineHeader"

export type TimelineComponent = 'Day' | 'Week' | 'Month'

export default function Timeline() {
  const [component, setComponent] = useState<TimelineComponent>('Day')

  const renderComponent = {
    'Day': <DayTimeline />,
    'Week': <WeekTimeline />,
    'Month': <MonthTimeline />,
  }

  const handleSetComponent = (type: TimelineComponent) => {
    setComponent(type)
  }

  return (
    <div className="w-full h-full bg-timelineBg p-[20px]">
      <TimelineHeader type={component} setComponent={handleSetComponent} />
      <div className="mt-[20px] w-full overflow-x-auto">
        {renderComponent[component]}
      </div>
    </div>
  )
}