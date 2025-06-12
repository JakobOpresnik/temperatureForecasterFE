export const getNextTimestamps = (start: string, count: number): string[] => {
  const [hours, minutes] = start.split(':').map(Number);
  const startDate = new Date();
  startDate.setHours(hours, minutes, 0, 0);

  const timestamps: string[] = [];

  for (let i = 1; i <= count; i++) {
    const next = new Date(startDate.getTime() + i * 30 * 60 * 1000);
    const hh = next.getHours().toString().padStart(2, '0');
    const mm = next.getMinutes().toString().padStart(2, '0');
    timestamps.push(`${hh}:${mm}`);
  }

  return timestamps;
};
