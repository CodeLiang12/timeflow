import TaskBlock from "@/utils/taskBlock";
import type { Task } from "@timeflow/types";
import ArrowRight from '@/assets/arrow-right.svg'
import ArrowLeft from '@/assets/arrow-left.svg'
import React, { useEffect, useRef, useState } from "react"
import {HOUR_WIDTH, allHours} from '../ui/TimelineHour'

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

const SNAP_THRESHOLD = 10;

export default function TaskBlockItem({ taskBlock, index, setToday, timelineRef, onShowAlignmentLine }: TaskBlockProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const taskBlockRef = useRef<HTMLDivElement>(null);

  // 检查是否接近时间点并显示对齐线
  const checkTimeAlignment = (currentX: number) => {
    if (!timelineRef.current || !taskBlockRef.current) {
      return
    }

    // const timelineRect = timelineRef.current.getBoundingClientRect();
    // const taskRect = taskBlockRef.current.getBoundingClientRect();

    const taskLeftEdge = taskBlock.startLeft + (currentX - startPosition.x);
    console.log(taskLeftEdge)

    let closestHour = null
    let minDistance = SNAP_THRESHOLD
    let alignmentPosition = 0
    let snapOffset = 0

    allHours.forEach((hour, index) => {
      const hourPosition = index * HOUR_WIDTH + 45
      const distance = Math.abs(taskLeftEdge - hourPosition)
      if(distance < minDistance) {
        minDistance = distance
        closestHour = index
        alignmentPosition = hourPosition
        snapOffset = hourPosition - taskLeftEdge
      }
    })

    if(closestHour !== null) {
      onShowAlignmentLine(alignmentPosition)
      const newX = currentX + snapOffset
      setPosition({ x: newX, y: position.y });
    } else {
      onShowAlignmentLine(null)
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartPosition({ x: e.clientX, y: e.clientY });
    setPosition({ x: e.clientX, y: e.clientY });
    
    // 创建一个变量来存储最新的鼠标位置
    let currentMousePosition = { x: e.clientX, y: e.clientY };
    
    // 添加临时的鼠标移动监听器来更新鼠标位置
    const mouseMoveHandler = (moveEvent: MouseEvent) => {
      currentMousePosition = { x: moveEvent.clientX, y: moveEvent.clientY };
    };
    
    // 添加临时的鼠标抬起监听器来清理
    const mouseUpHandler = () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('mouseup', mouseUpHandler);
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
      }
    };
    
    window.addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('mouseup', mouseUpHandler);
    
    longPressTimerRef.current = setTimeout(() => {
      // 使用最新的鼠标位置检查是否在元素内
      if (taskBlockRef.current) {
        const rect = taskBlockRef.current.getBoundingClientRect();
        const isInside = 
          currentMousePosition.x >= rect.left && 
          currentMousePosition.x <= rect.right && 
          currentMousePosition.y >= rect.top && 
          currentMousePosition.y <= rect.bottom;
        
        // 只有当鼠标在元素内时才设置拖拽状态
        if (isInside) {
          setIsDragging(true);
          setStartPosition(currentMousePosition);
        }
      }
      
      // 清理临时监听器
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('mouseup', mouseUpHandler);
    }, 500);
  }

  // 修改为接受原生 MouseEvent 类型
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({ x: e.clientX, y: e.clientY });
      checkTimeAlignment(e.clientX)
    }
  }

  const handleMouseUp = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    if (isDragging) {
      const deltaX = position.x - startPosition.x;
      
      console.log('拖拽结束，水平位移：', deltaX);
      
      setIsDragging(false);
      setPosition({ x: 0, y: 0 });
    }
  }

  // 组件内部的鼠标移动处理函数
  const handleLocalMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault(); // 防止选中文本
    }
  }

  // 添加和移除全局鼠标事件监听
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      
      // 添加禁止选择文本的样式
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'grabbing';
    } else {
      onShowAlignmentLine(null)
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      
      // 恢复文本选择
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isDragging]);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
      }
    };
  }, []);
  

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
          cursor: isDragging ? "grabbing" : "pointer",
          zIndex: isDragging ? 10 : 1,
          transition: isDragging ? 'none' : 'transform 0.2s ease', // 添加平滑过渡效果
        }}
        className={`h-[40px] top-[5px] text-white border rounded-md absolute text-ellipsis overflow-hidden whitespace-nowrap flex items-center justify-center ${
          taskBlock.diffDays > 0 && "border-dashed"
          } ${isDragging && 'shadow-lg'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleLocalMouseMove}
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
