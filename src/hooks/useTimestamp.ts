export const useTimestamp = (): string => {
  const now = new Date();
  const rounded = new Date(now);
  rounded.setMinutes(now.getMinutes() >= 30 ? 30 : 0);
  rounded.setSeconds(0);
  rounded.setMilliseconds(0);

  const timestamp: string = rounded.toISOString();
  return timestamp;
};
