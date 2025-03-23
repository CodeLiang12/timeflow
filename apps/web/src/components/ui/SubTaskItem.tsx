import type { BaseTask } from "@timeflow/types";
import { handleTime } from "@/utils/index";
import { FieldTimeOutlined } from "@ant-design/icons";

interface SubTaskItemProps {
  subTask: BaseTask;
}

export default function SubTaskItem({ subTask }: SubTaskItemProps) {
  const { startTime, endTime, diffDays } = handleTime(
    subTask.startTime,
    subTask.endTime
  );

  return (
    <div className="border rounded mt-3 p-3">
      <section>
        <p className="font-medium mb-1">{subTask.title}</p>
        <div className="flex justify-start items-center text-xs text-textLight">
          <FieldTimeOutlined className="mr-1" />
          <p>
            {startTime} - {endTime}{" "}
            {diffDays > 0 && <span>（+{diffDays}）</span>}
          </p>
        </div>
      </section>
    </div>
  );
}
