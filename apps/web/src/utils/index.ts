export function handleTime(start: string, end: string) {
  function formatTime(isoString: string): string {
    return isoString.slice(11, 16);
  }

  const startTime = formatTime(start);
  const endTime = formatTime(end);

  const startDate = new Date(start);
  const endDate = new Date(end);

  // 检查是否为同一天 - 确保使用 UTC 日期进行比较
  const isSameDay =
    startDate.getUTCFullYear() === endDate.getUTCFullYear() &&
    startDate.getUTCMonth() === endDate.getUTCMonth() &&
    startDate.getUTCDate() === endDate.getUTCDate();

  // 如果是同一天，diffDays 为 0
  const diffDays = isSameDay ? 0 : getDaysBetweenDates(startDate, endDate);

  // 计算总小时数
  const totalMilliseconds = endDate.getTime() - startDate.getTime();
  const totalHours = parseFloat(
    (totalMilliseconds / (1000 * 60 * 60)).toFixed(1)
  );

  return {
    startTime,
    endTime,
    diffDays,
    totalHours,
  };
}

// 计算两个日期之间的天数差，只考虑日期部分
function getDaysBetweenDates(startDate: Date, endDate: Date): number {
  // 创建新的日期对象，只保留年月日信息（使用 UTC）
  const start = new Date(
    Date.UTC(
      startDate.getUTCFullYear(),
      startDate.getUTCMonth(),
      startDate.getUTCDate()
    )
  );
  const end = new Date(
    Date.UTC(
      endDate.getUTCFullYear(),
      endDate.getUTCMonth(),
      endDate.getUTCDate()
    )
  );

  // 计算日期差（毫秒转天数）
  const diffTime = end.getTime() - start.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}
