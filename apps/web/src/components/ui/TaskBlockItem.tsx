import TaskBlock from "@/utils/taskBlock";
import type { Task } from "@timeflow/types";

const PriorityColor: Record<Task["priority"], string> = {
  high: "danger",
  medium: "warning",
  low: "success",
};

interface TaskBlockProps {
  taskBlock: TaskBlock;
  index: number;
}

export default function TaskBlockItem({ taskBlock, index }: TaskBlockProps) {
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
      >
        <p>{taskBlock.title}</p>
      </div>
    </div>
  );
}
