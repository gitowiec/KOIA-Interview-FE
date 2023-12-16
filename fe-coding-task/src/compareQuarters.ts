export const compareQuarters = (
  yearQuarter1: string,
  yearQuarter2: string,
): number => {
  const [year1, quarter1] = yearQuarter1.split("K").map((val) => parseInt(val));
  const [year2, quarter2] = yearQuarter2.split("K").map((val) => parseInt(val));
  const yearDiff = year2 - year1;
  if (yearDiff !== 0) return yearDiff;
  return quarter2 - quarter1;
};
