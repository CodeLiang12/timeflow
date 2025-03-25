import TimelineHour from "../ui/TimelineHour";
import { mockTasks2 } from "@/mock/index";
import TaskBlock from "@/utils/taskBlock";
import TaskBlockItem from "../ui/TaskBlockItem";
import dayjs from "dayjs";
import { useEffect, useState } from "react";


interface DayTimelineProps {
  currentDate: string
  setCurrentDate: (date:string) => void
}

export default function DayTimeline({currentDate, setCurrentDate}:DayTimelineProps) {
  const [taskBlocks, setTaskBlocks] = useState<TaskBlock[]>([])
  

  useEffect(() => {
    const filteredTasks = mockTasks2.filter((task) => {
      const dateStart = new Date(currentDate.split(' ')[0] + ' 00:00:00').getTime();
      const dateEnd = new Date(currentDate.split(' ')[0] + ' 24:00:00').getTime();
      const taskStart = new Date(task.startTime).getTime();
      const taskEnd = new Date(task.endTime).getTime();
      return (taskStart >= dateStart && taskStart <= dateEnd) || (taskEnd >= dateStart && taskEnd <= dateEnd) || (taskStart <= dateStart && taskEnd >= dateEnd);
    }).map((task) => {
      return new TaskBlock({ task, showDate: currentDate });
    })
    setTaskBlocks(filteredTasks);
  }, [currentDate])

  const handleToday = (date: string) => {
    const dateFormat = dayjs(date).format("YYYY-MM-DD HH:mm:ss")
    setCurrentDate(dateFormat)
  }

  return (
    <div
      className="min-w-[2190px] flex flex-col h-full p-[15px] pb-0 pr-0 relative bg-white shadow-md rounded-md"
    >
      <TimelineHour />
      <div className="flex-1 w-[calc(100% + 15px)] overflow-y-scroll">
        <div className="w-full py-[15px] flex flex-col justify-start">
          {taskBlocks.map((taskBlock, index) => {
            return (
              <TaskBlockItem
                key={taskBlock.id}
                taskBlock={taskBlock}
                index={index}
                setToday={handleToday}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
