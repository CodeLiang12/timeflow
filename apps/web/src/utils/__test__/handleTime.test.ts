import { handleTime } from "../index";
import { describe, test, expect } from 'vitest'

describe('handleTime 函数测试', () => {
  test('同一天的时间处理', () => {
    const result = handleTime("2025-03-19 09:00:00", "2025-03-19 11:00:00");
    
    expect(result.startTime).toBe("09:00");
    expect(result.endTime).toBe("11:00");
    expect(result.diffDays).toBe(0);
    expect(result.totalHours).toBe(2.0);
  });

  test('跨天的时间处理', () => {
    const result = handleTime("2025-03-20 10:00:00", "2025-03-22 16:00:00");
    
    expect(result.startTime).toBe("10:00");
    expect(result.endTime).toBe("16:00");
    expect(result.diffDays).toBe(2);
    expect(result.totalHours).toBe(54.0);
  });

  test('跨天但不足24小时的时间处理', () => {
    const result = handleTime("2025-03-23 12:00:00", "2025-03-24 09:00:00");
    
    expect(result.startTime).toBe("12:00");
    expect(result.endTime).toBe("09:00");
    expect(result.diffDays).toBe(1);
    expect(result.totalHours).toBe(21.0);
  });

  test('时间格式化测试', () => {
    const result = handleTime("2025-03-24 06:00:00", "2025-03-25 19:00:00");
    
    expect(result.startTime).toBe("06:00");
    expect(result.endTime).toBe("19:00");
    expect(result.diffDays).toBe(1);
    expect(result.totalHours).toBe(37.0);
  });
});