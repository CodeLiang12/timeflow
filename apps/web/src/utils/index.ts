export function handleTime(start: string, end: string) {
  function formatTime(isoString: string): string {
    return isoString.slice(11, 16);
  }

  const startTime = formatTime(start);
  const endTime = formatTime(end);

  const startDate = new Date(start);
  const endDate = new Date(end);

  const isSameDay =
    startDate.getFullYear() === endDate.getFullYear() &&
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getDate() === endDate.getDate();

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
  // 创建新的日期对象，只保留年月日信息（使用本地时间）
  const start = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );
  const end = new Date(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate()
  );

  // 计算日期差（毫秒转天数）
  const diffTime = end.getTime() - start.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}
