export function handleTime(start: string, end: string) {
  function formatTime(isoString: string): string {
    return isoString.slice(11, 16);
  }

  const startTime = formatTime(start);
  const endTime = formatTime(end);

  const startDate = new Date(start);
  const endDate = new Date(end);

  const startDay = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );

  const endDay = new Date(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate()
  );

  const diffTime = endDay.getTime() - startDay.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return {
    startTime,
    endTime,
    diffDays,
  };
}
