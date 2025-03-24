import TimelineHour from "../ui/TimelineHour";
import { mockTasks2 } from "@/mock/index";
import TaskBlock from "@/utils/taskBlock";
import TaskBlockItem from "../ui/TaskBlockItem";

export default function DayTimeline() {
  const TaskBlocks = mockTasks2.map((task) => {
    return new TaskBlock(task);
  });

  return (
    <div className="min-w-[2190px] p-[15px] pr-0 overflow-y-scroll bg-white shadow-md rounded-md overflow-x-auto">
      <TimelineHour />
      <div className="w-full mt-[20px] flex flex-col justify-start relative">
        {TaskBlocks.map((taskBlock, index) => {
          return (
            <TaskBlockItem
              key={taskBlock.id}
              taskBlock={taskBlock}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
}
