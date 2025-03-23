export interface Stats {
  completionRate: number; // 完成率 (0-1)
  plannedTasks: number;
  completedTasks: number;
  totalPlannedTime: number; // 小时
  timeUsage: { [date: string]: number }; // 每日时间利用率
}
