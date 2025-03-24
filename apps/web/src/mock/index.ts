import { Task } from "@timeflow/types";

export const mockTasks: Task[] = [
  // 任务 1：单天任务，无子任务
  {
    id: "task-001",
    title: "完成项目提案",
    description: "准备明天会议的项目提案",
    priority: "high",
    estimatedTime: 2,
    startTime: "2025-03-19T09:00:00",
    endTime: "2025-03-19T11:00:00",
    status: "pending",
  },
  // 任务 2：跨天任务，有子任务
  {
    id: "task-002",
    title: "开发新功能",
    description: "实现用户认证模块",
    priority: "medium",
    estimatedTime: 12,
    startTime: "2025-03-19T14:00:00",
    endTime: "2025-03-21T10:00:00",
    status: "pending",
    subTasks: [
      {
        id: "subtask-002-1",
        title: "设计数据库 schema",
        priority: "medium",
        estimatedTime: 2,
        startTime: "2025-03-19T14:00:00",
        endTime: "2025-03-19T16:00:00",
        status: "completed",
      },
      {
        id: "subtask-002-2",
        title: "实现登录 API",
        priority: "medium",
        estimatedTime: 4,
        startTime: "2025-03-20T09:00:00",
        endTime: "2025-03-20T13:00:00",
        status: "pending",
      },
      {
        id: "subtask-002-3",
        title: "前端表单集成",
        priority: "medium",
        estimatedTime: 3,
        startTime: "2025-03-21T08:00:00",
        endTime: "2025-03-21T11:00:00",
        status: "pending",
      },
    ],
  },
  // 任务 3：单天任务，无子任务
  {
    id: "task-003",
    title: "团队会议",
    priority: "low",
    estimatedTime: 1,
    startTime: "2025-03-19T13:00:00",
    endTime: "2025-03-19T14:00:00",
    status: "completed",
  },
  // 任务 4：单天任务，有子任务
  {
    id: "task-004",
    title: "文档撰写",
    description: "撰写用户手册初稿",
    priority: "medium",
    estimatedTime: 4,
    startTime: "2025-03-19T15:00:00",
    endTime: "2025-03-19T19:00:00",
    status: "pending",
    subTasks: [
      {
        id: "subtask-004-1",
        title: "整理功能列表",
        priority: "medium",
        estimatedTime: 1,
        startTime: "2025-03-19T15:00:00",
        endTime: "2025-03-19T16:00:00",
        status: "pending",
      },
      {
        id: "subtask-004-2",
        title: "编写简介",
        priority: "medium",
        estimatedTime: 1.5,
        startTime: "2025-03-19T16:00:00",
        endTime: "2025-03-19T17:30:00",
        status: "pending",
      },
    ],
  },
  // 任务 5：跨天任务，无子任务
  {
    id: "task-005",
    title: "代码审查",
    priority: "high",
    estimatedTime: 6,
    startTime: "2025-03-20T10:00:00",
    endTime: "2025-03-21T16:00:00",
    status: "pending",
  },
];

export const mockTasks2: Task[] = [
  // 任务 1：单天任务，无子任务
  {
    id: "task-001",
    title: "完成项目提案",
    description: "准备明天会议的项目提案",
    priority: "high",
    estimatedTime: 2,
    startTime: "2025-03-23T09:00:00",
    endTime: "2025-03-24T11:00:00",
    status: "pending",
  },
  // 任务 2：跨天任务，有子任务
  {
    id: "task-002",
    title: "开发新功能",
    description: "实现用户认证模块",
    priority: "medium",
    estimatedTime: 12,
    startTime: "2025-03-24T10:00:00",
    endTime: "2025-03-24T18:00:00",
    status: "pending",
  },
  // 任务 3：单天任务，无子任务
  {
    id: "task-003",
    title: "团队会议",
    priority: "low",
    estimatedTime: 1,
    startTime: "2025-03-24T13:00:00",
    endTime: "2025-03-24T14:00:00",
    status: "completed",
  },
  // 任务 4：单天任务，有子任务
  {
    id: "task-004",
    title: "文档撰写",
    description: "撰写用户手册初稿",
    priority: "medium",
    estimatedTime: 4,
    startTime: "2025-03-24T06:00:00",
    endTime: "2025-03-25T19:00:00",
    status: "pending",
  },
  // 任务 5：跨天任务，无子任务
  {
    id: "task-005",
    title: "代码审查",
    priority: "high",
    estimatedTime: 6,
    startTime: "2025-03-20T10:00:00",
    endTime: "2025-03-22T16:00:00",
    status: "pending",
  },
];
