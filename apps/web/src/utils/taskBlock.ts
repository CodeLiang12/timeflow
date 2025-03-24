import type { Task } from "@timeflow/types";
import { handleTime } from "./index";

class TaskBlock {
  public id: string;
  public title: string;
  public description?: string;
  public priority: "high" | "medium" | "low";
  public status: "pending" | "completed";
  public startLeft: number = 0;
  public endLeft: number = 0;
  public width: number = 0;
  public diffDays: number = 0;
  public showPreIcon: boolean = false;
  public showNextIcon: boolean = false;

  constructor(task: Task) {
    this.id = task.id;
    this.title = task.title;
    this.description = task?.description;
    this.priority = task.priority;
    this.status = task.status;

    this.initRange(task.startTime, task.endTime);
  }

  initRange(start: string, end: string) {
    const { startTime, endTime, diffDays } = handleTime(start, end);
    const startHour = startTime.split(":")[0];
    const endHour = endTime.split(":")[0];
    this.startLeft = checkIsToday(start) ? +startHour * 90 + 45 : 0;
    this.endLeft = checkIsToday(end) ? +endHour * 90 + 45 : 2160;
    this.diffDays = diffDays;
    console.log(diffDays, this.endLeft, checkIsToday(end));
    this.showPreIcon = diffDays > 1 && this.startLeft === 0;
    this.showNextIcon = diffDays > 1 && this.endLeft === 2160;
    this.width = this.endLeft - this.startLeft;
  }
}

function checkIsToday(dateString: string): boolean {
  const taskDate = new Date(dateString);
  const today = new Date();
  return (
    taskDate.getDate() === today.getDate() &&
    taskDate.getMonth() === today.getMonth() &&
    taskDate.getFullYear() === today.getFullYear()
  );
}

export default TaskBlock;
