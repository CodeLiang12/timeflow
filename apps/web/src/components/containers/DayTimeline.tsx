import TimelineHour, { HOUR_WIDTH } from "../ui/TimelineHour";
import { mockTasks2 } from "@/mock/index";
import TaskBlock from "@/utils/taskBlock";
import TaskBlockItem from "../ui/TaskBlockItem";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

interface DayTimelineProps {
  currentDate: string;
  setCurrentDate: (date: string) => void;
}

export default function DayTimeline({
  currentDate,
  setCurrentDate,
}: DayTimelineProps) {
  const [taskBlocks, setTaskBlocks] = useState<TaskBlock[]>([]);
  const [alignmentLine, setAlignmentLine] = useState<{ visible: boolean, position: number }>({ 
    visible: false, 
    position: 0 
  });
  const timelineRef = useRef<HTMLDivElement>(null);

  // 获取当前日期的任务
  useEffect(() => {
    const filteredTasks = mockTasks2
      .filter((task) => {
        const dateStart = new Date(
          currentDate.split(" ")[0] + " 00:00:00"
        ).getTime();
        const dateEnd = new Date(
          currentDate.split(" ")[0] + " 24:00:00"
        ).getTime();
        const taskStart = new Date(task.startTime).getTime();
        const taskEnd = new Date(task.endTime).getTime();
        return (
          (taskStart >= dateStart && taskStart <= dateEnd) ||
          (taskEnd >= dateStart && taskEnd <= dateEnd) ||
          (taskStart <= dateStart && taskEnd >= dateEnd)
        );
      })
      .map((task) => {
        return new TaskBlock({ task, showDate: currentDate });
      });
    setTaskBlocks(filteredTasks);
  }, [currentDate]);

  const handleToday = (date: string) => {
    const dateFormat = dayjs(date).format("YYYY-MM-DD HH:mm:ss");
    setCurrentDate(dateFormat);
  };

  const handleShowAlignmentLine = (position: number | null) => {
    if(!position) {
      setAlignmentLine({ visible: false, position: 0 });
      return;
    }
    setAlignmentLine({ visible: true, position });
  }

  return (
    <div className="w-full h-full overflow-x-scroll overflow-y-hidden">
      <div className="min-w-[2190px] flex flex-col h-full relative bg-white" ref={timelineRef}>
        <TimelineHour />
        {/* 对齐线 */}
        {
          alignmentLine.visible &&
          <div className="w-[2px] absolute top-[25px] h-full z-20 bg-blue-300" style={{left: alignmentLine.position + 'px'}}></div>
        }
        <div className="flex-1 pr-[15px] overflow-y-scroll">
          <div className="w-full py-[15px] flex flex-col justify-start">
            {taskBlocks.map((taskBlock, index) => {
              return (
                <TaskBlockItem
                  key={taskBlock.id}
                  taskBlock={taskBlock}
                  index={index}
                  timelineRef={timelineRef}
                  setToday={handleToday}
                  onShowAlignmentLine={handleShowAlignmentLine}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
