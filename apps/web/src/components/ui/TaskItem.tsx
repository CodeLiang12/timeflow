import type { Task } from "@timeflow/types";
import { FieldTimeOutlined } from "@ant-design/icons";
import SubTaskItem from "./SubTaskItem";
import clsx from "clsx";
import { handleTime } from "@/utils/index";

export interface TaskItemProps {
  task: Task;
}

type Level = Record<
  Task["priority"],
  { desc: "高" | "中" | "低"; bgColor: string; textColor: string }
>;

const PRIORITY_LEVELS: Level = {
  high: {
    desc: "高",
    bgColor: "bg-dangerBgColor",
    textColor: "text-dangerColor",
  },
  medium: {
    desc: "中",
    bgColor: "bg-warningBgColor",
    textColor: "text-warningColor",
  },
  low: {
    desc: "低",
    bgColor: "bg-successBgColor",
    textColor: "text-successColor",
  },
};

export default function TaskItem({ task }: TaskItemProps) {
  const priorityInfo = PRIORITY_LEVELS[task.priority];
  const { startTime, endTime, diffDays } = handleTime(
    task.startTime,
    task.endTime
  );

  return (
    <div className="w-full mt-3 p-3 border border-[#eee] rounded hover:shadow-sm hover:translate-y-[-2px] hover:bg-bgColor cursor-pointer transition-all">
      <div className="flex justify-between">
        <section>
          <p className="font-medium mb-1">{task.title}</p>
          <div className="flex justify-start items-center text-xs text-textLight">
            <FieldTimeOutlined className="mr-1" />
            <p>
              {startTime} - {endTime}{" "}
              {diffDays > 0 && <span>（+{diffDays}）</span>}
            </p>
          </div>
        </section>
        <div
          className={clsx(
            priorityInfo.bgColor,
            priorityInfo.textColor,
            "p-[7px] text-xs h-fit rounded"
          )}
        >
          {priorityInfo.desc}优先级
        </div>
      </div>
      {task?.subTasks && (
        <div className="pl-4">
          <div className="pl-3 border-l border-dashed">
            {task.subTasks.map((subTask) => (
              <SubTaskItem
                key={subTask.id}
                subTask={subTask}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
