import { useRef, useState } from "react"
import DayTimeline from "../containers/DayTimeline"
import WeekTimeline from "../containers/WeekTimeline"
import MonthTimeline from "../containers/MonthTimeline"
import TimelineHeader from "../ui/TimelineHeader"
import dayjs from "dayjs"

export type TimelineComponent = 'Day' | 'Week' | 'Month'

export default function Timeline() {
  const [component, setComponent] = useState<TimelineComponent>('Day')
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  //dayTimeline
  const [currentDate, setCurrentDate] = useState<string>(dayjs().format('YYYY-MM-DD HH:mm:ss'))

  const handleSetCurrentDate = (date: string | 'left' | 'right') => {
    if (date === 'left') {
      setCurrentDate(dayjs(currentDate.replace(/"/g, '')).subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss'))
    } else if (date === 'right') {
      setCurrentDate(dayjs(currentDate.replace(/"/g, '')).add(1, 'day').format('YYYY-MM-DD HH:mm:ss'))
    } else {
      setCurrentDate(date)
    }
    handleScroll()
  }

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.scrollBehavior = 'smooth';
      scrollContainerRef.current.scrollLeft = 0
    }
  }

  const renderComponent = {
    'Day': <DayTimeline currentDate={currentDate} setCurrentDate={handleSetCurrentDate}/>,
    'Week': <WeekTimeline />,
    'Month': <MonthTimeline />,
  }

  const handleSetComponent = (type: TimelineComponent) => {
    setComponent(type)
  }

  return (
    <div className="w-full h-full bg-timelineBg p-[20px] flex flex-col">
      <TimelineHeader type={component} setComponent={handleSetComponent} changeCurrent={handleSetCurrentDate}/>
      <div className="mt-[20px] flex-1 w-full overflow-x-auto" ref={scrollContainerRef}>
        {renderComponent[component]}
      </div>
      <div className="h-[80px] mt-[20px] bg-white w-full rounded"></div>
    </div>
  )
}