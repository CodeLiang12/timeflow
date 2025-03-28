import type { Task } from "@timeflow/types";
import { handleTime } from "./index";
import { HOUR_WIDTH, allHours } from '@/components/ui/TimelineHour'

const SNAP_DISTANCE = 15

interface TaskBlockOption {
  task: Task;
  showDate: string
}
class TaskBlock {
  public id: string;
  public title: string;
  public description?: string;
  public priority: "high" | "medium" | "low";
  public status: "pending" | "completed";
  public startTime: string;
  public endTime: string;
  public startLeft: number = 0;
  public endLeft: number = 0;
  public width: number = 0;
  public diffDays: number = 0;
  public showPreIcon: boolean = false;
  public showNextIcon: boolean = false;
  public showDate: string
  public finished: boolean = false;

  constructor({task, showDate}: TaskBlockOption) {
    this.id = task.id;
    this.title = task.title;
    this.description = task?.description;
    this.priority = task.priority;
    this.status = task.status;
    this.startTime = task.startTime;
    this.endTime = task.endTime;
    this.showDate = showDate
    this.finished = task.status === "completed";

    this.initRange(task.startTime, task.endTime);
  }

  initRange(start: string, end: string) {
    const { startTime, endTime, diffDays } = handleTime(start, end);
    const startHour = startTime.split(":")[0];
    const endHour = endTime.split(":")[0];
    this.startLeft = checkIsToday(start, this.showDate) ? +startHour * HOUR_WIDTH + 45: 45;
    this.endLeft = checkIsToday(end, this.showDate) ? +endHour * HOUR_WIDTH + 45 : 2115;
    this.diffDays = diffDays;
    this.showPreIcon = diffDays > 0 && this.startLeft === 45;
    this.showNextIcon = diffDays > 0 && this.endLeft === 2115;
    this.width = this.endLeft - this.startLeft;
  }

  setLeft(left: number) {
    this.startLeft = adsorption(left)
    this.width = this.endLeft - this.startLeft
  }

  setDragedLeft(deltaX: number) {
    this.startLeft = this.startLeft + deltaX
  }

  setPosition() {
    this.startLeft = setPosition(this.startLeft)
  }
}

function adsorption(position: number) {
  let result = position
  allHours.forEach((_, index) => {
    const left = index * HOUR_WIDTH + 45
    if (Math.abs(position - left) < SNAP_DISTANCE) {
      result = left
    }
  })
  return result
}

function setPosition(position: number) {
  let distance = Infinity
  let currentIndex = 0
  allHours.forEach((_, index) => {
    const left = index * HOUR_WIDTH + 45
    if (Math.abs(position - left) < distance) {
      distance = Math.abs(position - left)
      currentIndex = index
    }
  })
  console.log(distance, 'distance')
  return currentIndex * HOUR_WIDTH + 45
}

function checkIsToday(dateString: string, showDate: string): boolean {
  const taskDate = new Date(dateString);
  const today = new Date(showDate);

  const result =     taskDate.getDate() === today.getDate() &&
  taskDate.getMonth() === today.getMonth() &&
  taskDate.getFullYear() === today.getFullYear()

  // console.log(dateString, result)
  return result
}

export default TaskBlock;
