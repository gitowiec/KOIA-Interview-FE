export type SSBTableMetadata = {
  code: "Boligtype" | "ContentsCode" | "Tid";
  text: string;
  valueTexts: string[];
  values: string[];
}[];
type UISelectorsData = Record<
  "Boligtype" | "ContentsCode" | "Tid",
  {
    text: string;
    mappedValues: Record<"key" | "value", string>[];
  }
>;
export const prepareUISelectorsData = (data: SSBTableMetadata) => {
  return data.reduce<UISelectorsData>(
    (accu, { code, text, valueTexts, values }) => {
      accu[code] = {
        text,
        mappedValues: values.map((value, i) => ({
          key: value,
          value: valueTexts[i],
        })),
      };
      return accu;
    },
    { Boligtype: {}, ContentsCode: {}, Tid: {} } as UISelectorsData,
  );
};
