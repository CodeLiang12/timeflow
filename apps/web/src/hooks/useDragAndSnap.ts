import { useState, useRef, useEffect } from 'react';
import { HOUR_WIDTH, allHours } from '../components/ui/TimelineHour';
import TaskBlock from '@/utils/taskBlock';

interface DragAndSnapOptions {
  initialLeft: number;
  width: number;
  timelineRef: React.RefObject<HTMLDivElement | null>;
  onShowAlignmentLine: (position: number | null) => void;
  snapThreshold?: number;
  edgeThreshold?: number;
  onResize?: (newWidth: number, newLeft?: number) => void;
  taskInstance: TaskBlock
}

interface DragAndSnapResult {
  isDragging: boolean;
  position: { x: number, y: number };
  startPosition: { x: number, y: number };
  edgeHover: 'left' | 'right' | null;
  isResizing: 'left' | 'right' | null;
  handleMouseDown: (e: React.MouseEvent) => void;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseUp: () => void;
  handleMouseLeave: () => void;
  longPressTimerRef: React.RefObject<ReturnType<typeof setTimeout> | null>;
}

export function useDragAndSnap({
  initialLeft,
  width,
  timelineRef,
  onShowAlignmentLine,
  snapThreshold = 10,
  edgeThreshold = 8,
  onResize,
  taskInstance
}: DragAndSnapOptions): DragAndSnapResult {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState<'left' | 'right' | null>(null);
  const [edgeHover, setEdgeHover] = useState<'left' | 'right' | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalLeft, setOriginalLeft] = useState(0);
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const elementRef = useRef<HTMLElement | null>(null);

  // 检查是否接近时间点并显示对齐线
  const checkTimeAlignment = (currentX: number) => {
    if (!timelineRef.current || !elementRef.current) {
      return;
    }

    let taskLeftEdge;
    
    if (isResizing === 'right') {
      // 调整右边缘时，左边缘位置不变
      taskLeftEdge = initialLeft;
    } else if (isResizing === 'left') {
      // 调整左边缘时，计算新的左边缘位置
      taskLeftEdge = initialLeft + (currentX - startPosition.x);
    } else if (isDragging) {
      // 拖拽时，计算新的左边缘位置
      taskLeftEdge = initialLeft + (currentX - startPosition.x);
    } else {
      return;
    }
    
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
      
      if (isResizing === 'right') {
        // 右边缘调整不需要移动位置
      } else if (isResizing === 'left') {
        // 左边缘调整需要更新位置和宽度
        const newX = currentX + snapOffset;
        setPosition({ x: newX, y: position.y });
      } else if (isDragging) {
        // 拖拽需要更新位置
        const newX = currentX + snapOffset;
        setPosition({ x: newX, y: position.y });
      }
    } else {
      onShowAlignmentLine(null);
    }
  };

  // 检测鼠标是否在边缘
  const checkEdgeHover = (e: React.MouseEvent) => {
    if (!elementRef.current || isResizing || isDragging) return;
    
    const rect = elementRef.current.getBoundingClientRect();
    const mouseX = e.clientX;
    
    if (Math.abs(mouseX - rect.left) <= edgeThreshold) {
      setEdgeHover('left');
    } else if (Math.abs(mouseX - rect.right) <= edgeThreshold) {
      setEdgeHover('right');
    } else {
      setEdgeHover(null);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    // 保存对元素的引用
    elementRef.current = e.currentTarget as HTMLElement;
    
    // 检查是否在边缘
    if (edgeHover) {
      // 开始调整大小
      e.stopPropagation();
      setIsResizing(edgeHover);
      setStartPosition({ x: e.clientX, y: e.clientY });
      setOriginalWidth(width);
      setOriginalLeft(initialLeft);
      return;
    }
    
    // 拖拽逻辑
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

  // 处理全局鼠标移动
  const handleGlobalMouseMove = (e: MouseEvent) => {
    if (isResizing) {
      // 调整大小逻辑
      const deltaX = e.clientX - startPosition.x;
      
      if (isResizing === 'right') {
        // 调整右边缘 - 只改变宽度
        const newWidth = Math.max(50, originalWidth + deltaX); // 最小宽度为50px
        
        if (onResize) {
          onResize(newWidth);
        }
      } else if (isResizing === 'left') {
        // 调整左边缘 - 改变起始位置和宽度
        const maxDeltaX = originalWidth - 50; // 保证最小宽度
        const limitedDeltaX = Math.min(deltaX, maxDeltaX);
        
        const newWidth = originalWidth - limitedDeltaX;
        const newLeft = originalLeft + limitedDeltaX;
        
        if (onResize) {
          onResize(newWidth, newLeft);
        }
      }
      
      // 检查是否接近时间点
      checkTimeAlignment(e.clientX);
    } else if (isDragging) {
      // taskInstance.setLeft(e.clientX)
      setPosition({ x: e.clientX, y: e.clientY });
      checkTimeAlignment(e.clientX);
    }
  };

  // 处理全局鼠标抬起
  const handleGlobalMouseUp = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    
    taskInstance.setPosition()
    if (isResizing) {
      setIsResizing(null);
    } else if (isDragging) {
      const deltaX = position.x - startPosition.x;
      console.log('拖拽结束，水平位移：', deltaX);
      taskInstance.setDragedLeft(deltaX)
      taskInstance.setPosition()
      
      // taskInstance.setPosition()
      setIsDragging(false);
      setPosition({ x: 0, y: 0 });
    }
    
  };

  // 组件内部的鼠标移动处理函数
  const handleMouseMove = (e: React.MouseEvent) => {
    checkEdgeHover(e);
    
    if (isDragging || isResizing) {
      e.preventDefault(); // 防止选中文本
    }
  };

  // 处理鼠标离开
  const handleMouseLeave = () => {
    if (!isResizing && !isDragging) {
      setEdgeHover(null);
    }
  };

  // 处理鼠标抬起
  const handleMouseUp = () => {
    // 这个函数主要用于组件内部的鼠标抬起事件
    // 大部分逻辑已经在全局的mouseup事件中处理
    console.log(111)
  };

  // 添加和移除全局鼠标事件监听
  useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
      
      // 添加禁止选择文本的样式
      document.body.style.userSelect = 'none';
      
      if (isResizing) {
        document.body.style.cursor = 'ew-resize';
      } else if (isDragging) {
        document.body.style.cursor = 'grabbing';
      }
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
  }, [isDragging, isResizing, position.y]);

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
    edgeHover,
    isResizing,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    longPressTimerRef
  };
}