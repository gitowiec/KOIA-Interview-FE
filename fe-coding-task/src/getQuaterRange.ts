/**
 * @throws
 * @param yearQuarter1
 * @param yearQuarter2
 */
export const getQuaterRange = (
  yearQuarter1: string,
  yearQuarter2: string,
): string[] => {
  const [year1, quarter1] = yearQuarter1.split("K").map((val) => parseInt(val));
  const [year2, quarter2] = yearQuarter2.split("K").map((val) => parseInt(val));
  const yearDiff = year2 - year1;
  const quarterDiff = quarter2 - quarter1;
  if (yearDiff === 0 && quarterDiff === 0) throw "zero length not impossible";
  if (yearDiff === 0 && quarterDiff < 0) throw "reverse order not implemented";
  if (yearDiff < 0) throw "reverse order not implemented";

  const numberOfQuarters = yearDiff * 4 + quarter2 - quarter1 + 1;

  const range = Array.from(Array(numberOfQuarters));

  const startYear = quarter1 === 4 ? year1 + 1 : year1;
  const startQuarter = quarter1 === 4 ? 1 : quarter1;
  range[0] = [startYear, startQuarter];

  for (let i = 1; i < range.length; i++) {
    const prev = range[i - 1];
    if (prev[1] === 4) {
      range[i] = [prev[0] + 1, 1];
    } else {
      range[i] = [prev[0], prev[1] + 1];
    }
  }
  return range.map(([year, quarter]) => `${year}K${quarter}`);
};
