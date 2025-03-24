export interface BaseTask {
  id: string;
  title: string;
  description?: string;
  priority: "high" | "medium" | "low";
  estimatedTime?: number; // 小时
  startTime: string; // ISO 日期字符串
  endTime: string; // ISO 日期字符串
  status: "pending" | "completed";
}

export interface Task extends BaseTask {
  subTasks?: BaseTask[];
}
