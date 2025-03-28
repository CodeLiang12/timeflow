import { Task } from "@timeflow/types";

export const mockTasks: Task[] = [
  // 任务 1：单天任务，无子任务
  {
    id: "task-001",
    title: "完成项目提案",
    description: "准备明天会议的项目提案",
    priority: "high",
    estimatedTime: 2,
    startTime: "2025-03-19 09:00:00",
    endTime: "2025-03-19 11:00:00",
    status: "pending",
  },
  // 任务 2：跨天任务，有子任务
  {
    id: "task-002",
    title: "开发新功能",
    description: "实现用户认证模块",
    priority: "medium",
    estimatedTime: 12,
    startTime: "2025-03-19 14:00:00",
    endTime: "2025-03-21 10:00:00",
    status: "pending",
    subTasks: [
      {
        id: "subtask-002-1",
        title: "设计数据库 schema",
        priority: "medium",
        estimatedTime: 2,
        startTime: "2025-03-19 14:00:00",
        endTime: "2025-03-19 16:00:00",
        status: "completed",
      },
      {
        id: "subtask-002-2",
        title: "实现登录 API",
        priority: "medium",
        estimatedTime: 4,
        startTime: "2025-03-20 09:00:00",
        endTime: "2025-03-20 13:00:00",
        status: "pending",
      },
      {
        id: "subtask-002-3",
        title: "前端表单集成",
        priority: "medium",
        estimatedTime: 3,
        startTime: "2025-03-21 08:00:00",
        endTime: "2025-03-21 11:00:00",
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
    startTime: "2025-03-19 13:00:00",
    endTime: "2025-03-19 14:00:00",
    status: "completed",
  },
  // 任务 4：单天任务，有子任务
  {
    id: "task-004",
    title: "文档撰写",
    description: "撰写用户手册初稿",
    priority: "medium",
    estimatedTime: 4,
    startTime: "2025-03-19 15:00:00",
    endTime: "2025-03-19 19:00:00",
    status: "pending",
    subTasks: [
      {
        id: "subtask-004-1",
        title: "整理功能列表",
        priority: "medium",
        estimatedTime: 1,
        startTime: "2025-03-19 15:00:00",
        endTime: "2025-03-19 16:00:00",
        status: "pending",
      },
      {
        id: "subtask-004-2",
        title: "编写简介",
        priority: "medium",
        estimatedTime: 1.5,
        startTime: "2025-03-19 16:00:00",
        endTime: "2025-03-19 17:30:00",
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
    startTime: "2025-03-20 10:00:00",
    endTime: "2025-03-21 16:00:00",
    status: "pending",
  },
];

export const mockTasks2: Task[] = [
  // 任务 1：单天任务，无子任务
  {
    id: "task-001",
    title: "产品需求分析",
    description: "分析用户反馈并整理产品需求文档",
    priority: "high",
    estimatedTime: 3,
    startTime: "2025-03-27 09:00:00",
    endTime: "2025-03-28 12:00:00",
    status: "pending",
  },
  // 任务 2：跨天任务，无子任务
  {
    id: "task-002",
    title: "UI设计评审",
    description: "与设计团队一起评审新功能的UI设计",
    priority: "medium",
    estimatedTime: 8,
    startTime: "2025-03-28 14:00:00",
    endTime: "2025-03-28 16:00:00",
    status: "pending",
  },
  // 任务 3：单天任务，无子任务
  {
    id: "task-003",
    title: "每周团队会议",
    description: "讨论本周进度和下周计划",
    priority: "low",
    estimatedTime: 1.5,
    startTime: "2025-03-28 13:00:00",
    endTime: "2025-03-28 14:30:00",
    status: "completed",
  },
  // 任务 4：跨天任务，无子任务
  {
    id: "task-004",
    title: "性能优化",
    description: "优化应用启动时间和响应速度",
    priority: "high",
    estimatedTime: 10,
    startTime: "2025-03-27 10:00:00",
    endTime: "2025-03-28 12:00:00",
    status: "pending",
  },
  // 任务 5：单天任务，无子任务
  {
    id: "task-005",
    title: "客户演示准备",
    description: "准备下周客户演示的材料和演示环境",
    priority: "high",
    estimatedTime: 4,
    startTime: "2025-03-28 15:00:00",
    endTime: "2025-03-28 19:00:00",
    status: "pending",
  },
  // 任务 6：跨天任务，无子任务
  {
    id: "task-006",
    title: "数据库迁移",
    description: "将现有数据迁移到新的数据库架构",
    priority: "medium",
    estimatedTime: 12,
    startTime: "2025-03-28 08:00:00",
    endTime: "2025-03-29 12:00:00",
    status: "pending",
  },
  // 任务 7：单天任务，无子任务
  {
    id: "task-007",
    title: "代码审查",
    description: "审查团队成员提交的代码变更",
    priority: "medium",
    estimatedTime: 3,
    startTime: "2025-03-28 09:00:00",
    endTime: "2025-03-28 12:00:00",
    status: "pending",
  },
  // 任务 8：跨天任务，无子任务
  {
    id: "task-008",
    title: "自动化测试开发",
    description: "为新功能编写自动化测试用例",
    priority: "medium",
    estimatedTime: 8,
    startTime: "2025-03-28 13:00:00",
    endTime: "2025-03-29 13:00:00",
    status: "pending",
  },
  // 任务 9：单天任务，无子任务
  {
    id: "task-009",
    title: "技术分享准备",
    description: "准备关于新技术栈的团队分享",
    priority: "low",
    estimatedTime: 2,
    startTime: "2025-03-28 16:00:00",
    endTime: "2025-03-28 18:00:00",
    status: "pending",
  },
  // 任务 10：跨天任务，无子任务
  {
    id: "task-010",
    title: "文档更新",
    description: "更新API文档和用户手册",
    priority: "medium",
    estimatedTime: 6,
    startTime: "2025-03-28 14:00:00",
    endTime: "2025-03-28 16:00:00",
    status: "pending",
  },
  // 任务 11：单天任务，无子任务
  {
    id: "task-011",
    title: "用户调研访谈",
    description: "与核心用户进行一对一访谈，收集产品反馈",
    priority: "high",
    estimatedTime: 2.5,
    startTime: "2025-03-27 10:00:00",
    endTime: "2025-03-29 12:30:00",
    status: "pending",
  },
  // 任务 12：跨天任务，无子任务
  {
    id: "task-012",
    title: "安全审计",
    description: "对系统进行安全漏洞扫描和评估",
    priority: "high",
    estimatedTime: 9,
    startTime: "2025-03-27 15:00:00",
    endTime: "2025-03-2-28 10:00:00",
    status: "pending",
  },
  // 任务 13：单天任务，无子任务
  {
    id: "task-013",
    title: "第三方API集成",
    description: "集成支付网关API",
    priority: "medium",
    estimatedTime: 4,
    startTime: "2025-03-28 13:00:00",
    endTime: "2025-03-28 17:00:00",
    status: "pending",
  },
  // 任务 14：跨天任务，无子任务
  {
    id: "task-014",
    title: "版本发布准备",
    description: "准备下一版本的发布计划和变更日志",
    priority: "medium",
    estimatedTime: 5,
    startTime: "2025-03-28 16:00:00",
    endTime: "2025-03-28 13:00:00",
    status: "pending",
  },
  // 任务 15：单天任务，无子任务
  {
    id: "task-015",
    title: "竞品分析",
    description: "分析主要竞争对手的产品功能和市场策略",
    priority: "low",
    estimatedTime: 3,
    startTime: "2025-03-28 09:00:00",
    endTime: "2025-03-29 12:00:00",
    status: "pending",
  },
];
