import TaskBlock from "@/utils/taskBlock";
import type { Task } from "@timeflow/types";
import ArrowRight from '@/assets/arrow-right.svg'
import ArrowLeft from '@/assets/arrow-left.svg'
import { useRef, useState } from "react";

const PriorityColor: Record<Task["priority"], string> = {
  high: "danger",
  medium: "warning",
  low: "success",
};

interface TaskBlockProps {
  taskBlock: TaskBlock;
  index: number;
  setToday: (date: string) => void;
}

export default function TaskBlockItem({ taskBlock, index, setToday }: TaskBlockProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    // console.log
    console.log(e.clientX, e.clientY)
  }

  return (
    <div
      key={taskBlock.id}
      className={`w-full cursor-pointer h-[50px] relative ${
        index % 2 === 1 ? "bg-white" : "bg-timelineBg"
      }`}
    >
      <div
        style={{
          width: `${taskBlock.width}px`,
          left: `${taskBlock.startLeft}px`,
          backgroundColor:
            "var(--" + PriorityColor[taskBlock.priority] + "-mid-color)",
          borderColor: "var(--" + PriorityColor[taskBlock.priority] + "-color)",
        }}
        className={`h-[40px] top-[5px] text-white border rounded-md absolute text-ellipsis overflow-hidden whitespace-nowrap flex items-center justify-center ${
          taskBlock.diffDays > 0 && "border-dashed"
          }`}
        onMouseDown={handleMouseDown}
      >
        {
          taskBlock.showPreIcon &&
          <img src={ArrowLeft} className="absolute left-3" onClick={()=>setToday(taskBlock.startTime)}></img>
        }
        <p>{taskBlock.title}</p>
        {
          taskBlock.showNextIcon &&
          <img src={ArrowRight} className="absolute right-3" onClick={()=>setToday(taskBlock.endTime)}></img>
        }
      </div>
    </div>
  );
}
