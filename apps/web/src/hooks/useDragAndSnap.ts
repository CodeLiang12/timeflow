import { useState, useRef, useEffect } from 'react';
import { HOUR_WIDTH, allHours } from '../components/ui/TimelineHour';

interface DragAndSnapOptions {
  initialLeft: number;
  width: number;
  timelineRef: React.RefObject<HTMLDivElement | null>;
  onShowAlignmentLine: (position: number | null) => void;
  snapThreshold?: number;
}

interface DragAndSnapResult {
  isDragging: boolean;
  position: { x: number, y: number };
  startPosition: { x: number, y: number };
  handleMouseDown: (e: React.MouseEvent) => void;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseUp: () => void;
  longPressTimerRef: React.RefObject<ReturnType<typeof setTimeout> | null>;
}

export function useDragAndSnap({
  initialLeft,
  width,
  timelineRef,
  onShowAlignmentLine,
  snapThreshold = 10
}: DragAndSnapOptions): DragAndSnapResult {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const elementRef = useRef<HTMLElement | null>(null);

  // 检查是否接近时间点并显示对齐线
  const checkTimeAlignment = (currentX: number) => {
    if (!timelineRef.current || !elementRef.current || !isDragging) {
      return;
    }

    const taskLeftEdge = initialLeft + (currentX - startPosition.x);
    
    let closestHour = null;
    let minDistance = snapThreshold;
    let alignmentPosition = 0;
    let snapOffset = 0;

    allHours.forEach((hour, index) => {
      const hourPosition = index * HOUR_WIDTH + 45;
      const distance = Math.abs(taskLeftEdge - hourPosition);
      if (distance < minDistance) {
        minDistance = distance;
        closestHour = index;
        alignmentPosition = hourPosition;
        snapOffset = hourPosition - taskLeftEdge;
      }
    });

    if (closestHour !== null) {
      onShowAlignmentLine(alignmentPosition);
      const newX = currentX + snapOffset;
      setPosition({ x: newX, y: position.y });
    } else {
      onShowAlignmentLine(null);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    // 保存对元素的引用
    elementRef.current = e.currentTarget as HTMLElement;
    
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
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
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
  };

  // 处理鼠标移动
  const handleGlobalMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({ x: e.clientX, y: e.clientY });
      checkTimeAlignment(e.clientX);
    }
  };

  // 处理鼠标抬起
  const handleGlobalMouseUp = () => {
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
  };

  // 组件内部的鼠标移动处理函数
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault(); // 防止选中文本
    }
  };

  // 处理鼠标抬起
  const handleMouseUp = () => {
    // 这个函数主要用于组件内部的鼠标抬起事件
    // 大部分逻辑已经在全局的mouseup事件中处理
  };

  // 添加和移除全局鼠标事件监听
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
      
      // 添加禁止选择文本的样式
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'grabbing';
    } else {
      onShowAlignmentLine(null);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      
      // 恢复文本选择
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isDragging, position.y]);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
      }
    };
  }, []);

  return {
    isDragging,
    position,
    startPosition,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    longPressTimerRef
  };
}