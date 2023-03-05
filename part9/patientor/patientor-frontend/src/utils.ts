export const dateISOString = (date: Date): string => {
  return date.toISOString().split("T")[0];
};
