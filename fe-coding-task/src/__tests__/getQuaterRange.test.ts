import { getQuaterRange } from "../getQuaterRange";

const quarters = ["2009K1", "2009K2", "2009K3", "2009K4"];
const quarters2 = [
  "2010K1",
  "2010K2",
  "2010K3",
  "2010K4",
  "2011K1",
  "2011K2",
  "2011K3",
  "2011K4",
  "2012K1",
  "2012K2",
  "2012K3",
  "2012K4",
  "2013K1",
  "2013K2",
  "2013K3",
  "2013K4",
  "2014K1",
  "2014K2",
  "2014K3",
  "2014K4",
  "2015K1",
  "2015K2",
  "2015K3",
];
const quarters3 = [
  "2015K4",
  "2016K1",
  "2016K2",
  "2016K3",
  "2016K4",
  "2017K1",
  "2017K2",
  "2017K3",
  "2017K4",
  "2018K1",
  "2018K2",
  "2018K3",
  "2018K4",
  "2019K1",
  "2019K2",
  "2019K3",
  "2019K4",
  "2020K1",
  "2020K2",
  "2020K3",
  "2020K4",
  "2021K1",
  "2021K2",
  "2021K3",
  "2021K4",
  "2022K1",
  "2022K2",
  "2022K3",
  "2022K4",
];
test("getQuarterRange 1", () => {
  const result = getQuaterRange("2009K1", "2009K4");
  expect(result.toString() === quarters.toString());
});
test("getQuarterRange 2", () => {
  const result = getQuaterRange("2010K1", "2015K3");
  expect(result.toString() === quarters2.toString());
});
test("getQuarterRange 3", () => {
  const result = getQuaterRange("2015K4", "2022K4");
  expect(result.toString() === quarters3.toString());
});
test("getQuarterRange 4", () => {
  const doesItThrow = () => getQuaterRange("2015K4", "2014K4");
  expect(doesItThrow).toThrow();
});
test("getQuarterRange 5", () => {
  const doesItThrow = () => getQuaterRange("2014K4", "2014K1");
  expect(doesItThrow).toThrow();
});
test("getQuarterRange 6", () => {
  const doesItThrow = () => getQuaterRange("2014K1", "2014K1");
  expect(doesItThrow).toThrow();
});
