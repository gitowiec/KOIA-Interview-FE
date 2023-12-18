import { getQuaterRange } from "./getQuaterRange";

const tidFilterQuery = {
  filter: "all",
  values: ["*"],
};

const boligtypeFilterQuery = {
  filter: "all",
  values: ["*"],
};

const contentsCodeFilterQuery = {
  filter: "all",
  values: ["*"],
};

const queryObj = {
  query: [
    {
      code: "Boligtype",
      selection: boligtypeFilterQuery,
    },
    {
      code: "ContentsCode",
      selection: contentsCodeFilterQuery,
    },
    {
      code: "Tid",
      selection: tidFilterQuery,
    },
  ],
  response: {
    format: "json-stat2",
  },
};

type Input = {
  tid1?: string;
  tid2?: string;
  boligtype?: string;
};

const getDataQuery = ({
  tid1,
  tid2,
  boligtype,
}: Partial<Record<"boligtype" | "tid1" | "tid2", string>> = {}) => {
  const query = [];
  query.push({
    code: "Boligtype",
    selection: boligtype
      ? {
          filter: "item",
          values: [boligtype],
        }
      : boligtypeFilterQuery,
  });
  query.push({
    code: "ContentsCode",
    selection: contentsCodeFilterQuery,
  });
  query.push({
    code: "Tid",
    selection:
      tid1 && tid2
        ? {
            filter: "item",
            values: getQuaterRange(tid1, tid2),
          }
        : tidFilterQuery,
  });
  return {
    query,
    response: {
      format: "json-stat2",
    },
  };
};

export { getDataQuery };
