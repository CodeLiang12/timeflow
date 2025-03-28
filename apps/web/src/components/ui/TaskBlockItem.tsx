import TaskBlock from "@/utils/taskBlock";
import type { Task } from "@timeflow/types";
import ArrowRight from '@/assets/arrow-right.svg'
import ArrowLeft from '@/assets/arrow-left.svg'
import React, { useRef, useState, useEffect } from "react"
import { useDragAndSnap } from '@/hooks/useDragAndSnap';

const PriorityColor: Record<Task["priority"], string> = {
  high: "danger",
  medium: "warning",
  low: "success",
};

interface TaskBlockProps {
  taskBlock: TaskBlock;
  index: number;
  setToday: (date: string) => void;
  timelineRef: React.RefObject<HTMLDivElement | null>;
  onShowAlignmentLine: (position: number | null)=>void
}

// const SNAP_THRESHOLD = 10;
const EDGE_THRESHOLD = 8; // 边缘检测的像素范围

export default function TaskBlockItem({ taskBlock, index, setToday, timelineRef, onShowAlignmentLine }: TaskBlockProps) {
  const taskBlockRef = useRef<HTMLDivElement>(null);
  
  // 使用自定义Hook处理拖拽和吸附
  const {
    isDragging,
    position,
    startPosition,
    edgeHover,
    isResizing,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave
  } = useDragAndSnap({
    initialLeft: taskBlock.startLeft,
    width: taskBlock.width,
    timelineRef,
    onShowAlignmentLine,
    onResize: (newWidth, newLeft) => {
      console.log('调整大小', newWidth, newLeft)
      taskBlock.setLeft(newLeft as number)
    },
    taskInstance: taskBlock,
  });

  // 获取鼠标样式
  const getCursorStyle = () => {
    if (isDragging) return "grabbing";
    if (isResizing) return "ew-resize";
    if (edgeHover) return "ew-resize";
    return "pointer";
  };

  return (
    <div
      key={taskBlock.id}
      className={`w-full cursor-pointer h-[50px] relative ${
        index % 2 === 1 ? "bg-white" : "bg-timelineBg"
      }`}
    >
      <div
        ref={taskBlockRef}
        style={{
          width: `${taskBlock.width}px`,
          left: `${taskBlock.startLeft}px`,
          backgroundColor:
            "var(--" + PriorityColor[taskBlock.priority] + "-mid-color)",
          borderColor: "var(--" + PriorityColor[taskBlock.priority] + "-color)",
          transform: isDragging ? `translatex(${position.x - startPosition.x}px)` : "",
          cursor: getCursorStyle(),
          zIndex: isDragging ? 10 : 1,
          transition: isDragging || isResizing ? 'null' : 'all 0.2s ease', // 添加平滑过渡效果
        }}
        className={`h-[40px] top-[5px] text-white border rounded-md absolute text-ellipsis overflow-hidden whitespace-nowrap flex items-center justify-center ${
          taskBlock.diffDays > 0 && "border-dashed"
          } ${isDragging && 'shadow-lg'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
      >
        {
          taskBlock.showPreIcon &&
          <img 
            src={ArrowLeft} 
            className="absolute left-3" 
            onClick={(e) => {
              e.stopPropagation(); // 防止触发父元素的事件
              setToday(taskBlock.startTime);
            }}
          />
        }
        <p>{taskBlock.title}</p>
        {
          taskBlock.showNextIcon &&
          <img 
            src={ArrowRight} 
            className="absolute right-3" 
            onClick={(e) => {
              e.stopPropagation(); // 防止触发父元素的事件
              setToday(taskBlock.endTime);
            }}
          />
        }
      </div>
    </div>
  );
}
