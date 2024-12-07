export const calculateRemainingTime = (timestamp: string, durationMinutes: number) => {
  const startTime = new Date(timestamp).getTime();
  const endTime = startTime + durationMinutes * 60 * 1000;
  const remainingTime = endTime - Date.now();

  if (remainingTime <= 0) return "Expired";

  const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
  const hours = Math.floor(remainingTime / 1000 / 60 / 60);

  return `${hours}h ${minutes}m remaining`;
};
