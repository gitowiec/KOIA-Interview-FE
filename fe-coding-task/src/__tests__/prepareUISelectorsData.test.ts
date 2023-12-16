import { prepareUISelectorsData } from "../prepareUISelectorsData";

const input = [
  {
    code: "Boligtype",
    text: "type of dwelling",
    values: ["00", "02", "03"],
    valueTexts: ["Total", "Row houses", "Multi-dwelling"],
    elimination: true,
  },
  {
    code: "ContentsCode",
    text: "contents",
    values: ["KvPris", "Omsetninger"],
    valueTexts: ["Freeholder per km² (NOK)", "Number of sales"],
  },
  {
    code: "Tid",
    text: "quarter",
    values: [
      "2009K1",
      "2009K2",
      "2009K3",
      "2009K4",
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
      "2023K1",
      "2023K2",
      "2023K3",
    ],
    valueTexts: [
      "2009K1",
      "2009K2",
      "2009K3",
      "2009K4",
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
      "2023K1",
      "2023K2",
      "2023K3",
    ],
    time: true,
  },
];
const output = {
  Boligtype: {
    text: "type of dwelling",
    mappedValues: [
      {
        key: "00",
        value: "Total",
      },
      {
        key: "02",
        value: "Row houses",
      },
      {
        key: "03",
        value: "Multi-dwelling",
      },
    ],
  },
  ContentsCode: {
    text: "contents",
    mappedValues: [
      {
        key: "KvPris",
        value: "Freeholder per km² (NOK)",
      },
      {
        key: "Omsetninger",
        value: "Number of sales",
      },
    ],
  },
  Tid: {
    text: "quarter",
    mappedValues: [
      {
        key: "2009K1",
        value: "2009K1",
      },
      {
        key: "2009K2",
        value: "2009K2",
      },
      {
        key: "2009K3",
        value: "2009K3",
      },
      {
        key: "2009K4",
        value: "2009K4",
      },
      {
        key: "2010K1",
        value: "2010K1",
      },
      {
        key: "2010K2",
        value: "2010K2",
      },
      {
        key: "2010K3",
        value: "2010K3",
      },
      {
        key: "2010K4",
        value: "2010K4",
      },
      {
        key: "2011K1",
        value: "2011K1",
      },
      {
        key: "2011K2",
        value: "2011K2",
      },
      {
        key: "2011K3",
        value: "2011K3",
      },
      {
        key: "2011K4",
        value: "2011K4",
      },
      {
        key: "2012K1",
        value: "2012K1",
      },
      {
        key: "2012K2",
        value: "2012K2",
      },
      {
        key: "2012K3",
        value: "2012K3",
      },
      {
        key: "2012K4",
        value: "2012K4",
      },
      {
        key: "2013K1",
        value: "2013K1",
      },
      {
        key: "2013K2",
        value: "2013K2",
      },
      {
        key: "2013K3",
        value: "2013K3",
      },
      {
        key: "2013K4",
        value: "2013K4",
      },
      {
        key: "2014K1",
        value: "2014K1",
      },
      {
        key: "2014K2",
        value: "2014K2",
      },
      {
        key: "2014K3",
        value: "2014K3",
      },
      {
        key: "2014K4",
        value: "2014K4",
      },
      {
        key: "2015K1",
        value: "2015K1",
      },
      {
        key: "2015K2",
        value: "2015K2",
      },
      {
        key: "2015K3",
        value: "2015K3",
      },
      {
        key: "2015K4",
        value: "2015K4",
      },
      {
        key: "2016K1",
        value: "2016K1",
      },
      {
        key: "2016K2",
        value: "2016K2",
      },
      {
        key: "2016K3",
        value: "2016K3",
      },
      {
        key: "2016K4",
        value: "2016K4",
      },
      {
        key: "2017K1",
        value: "2017K1",
      },
      {
        key: "2017K2",
        value: "2017K2",
      },
      {
        key: "2017K3",
        value: "2017K3",
      },
      {
        key: "2017K4",
        value: "2017K4",
      },
      {
        key: "2018K1",
        value: "2018K1",
      },
      {
        key: "2018K2",
        value: "2018K2",
      },
      {
        key: "2018K3",
        value: "2018K3",
      },
      {
        key: "2018K4",
        value: "2018K4",
      },
      {
        key: "2019K1",
        value: "2019K1",
      },
      {
        key: "2019K2",
        value: "2019K2",
      },
      {
        key: "2019K3",
        value: "2019K3",
      },
      {
        key: "2019K4",
        value: "2019K4",
      },
      {
        key: "2020K1",
        value: "2020K1",
      },
      {
        key: "2020K2",
        value: "2020K2",
      },
      {
        key: "2020K3",
        value: "2020K3",
      },
      {
        key: "2020K4",
        value: "2020K4",
      },
      {
        key: "2021K1",
        value: "2021K1",
      },
      {
        key: "2021K2",
        value: "2021K2",
      },
      {
        key: "2021K3",
        value: "2021K3",
      },
      {
        key: "2021K4",
        value: "2021K4",
      },
      {
        key: "2022K1",
        value: "2022K1",
      },
      {
        key: "2022K2",
        value: "2022K2",
      },
      {
        key: "2022K3",
        value: "2022K3",
      },
      {
        key: "2022K4",
        value: "2022K4",
      },
      {
        key: "2023K1",
        value: "2023K1",
      },
      {
        key: "2023K2",
        value: "2023K2",
      },
      {
        key: "2023K3",
        value: "2023K3",
      },
    ],
  },
};
test("prepareUISelectorsData", () => {
  const result = prepareUISelectorsData(input);

  expect(result).toEqual(output);
});
