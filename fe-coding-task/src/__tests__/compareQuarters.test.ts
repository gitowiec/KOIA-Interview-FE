import { compareQuarters } from "../compareQuarters";

const quarters1 = ["2009K1", "2009K2", "2009K3"];
const quarters2 = ["2009K4", "2010K1", "2010K2"];
const quarters3 = ["2010K3", "2010K4", "2011K1"];

test("compareQuarters must return greater than 0", () => {
  const result = compareQuarters(quarters1[0], quarters2[0]);
  expect(result).toBeGreaterThan(0);
});
test("compareQuarters must return less than zero", () => {
  const result = compareQuarters(quarters2[2], quarters1[0]);
  expect(result).toBeLessThan(0);
});
test("compareQuarters must return equal zero", () => {
  const result = compareQuarters(quarters3[2], quarters3[2]);
  expect(result).toBe(0);
});
