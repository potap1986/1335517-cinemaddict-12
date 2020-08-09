export const getDurationString = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration - hours * 60;
  return `${hours}h ${minutes}m`;
};
