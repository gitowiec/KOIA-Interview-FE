import { memo, useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";

type Props = {
  data?: { value: number; status: null }[];
  quarterRange: string[];
};

function drawChart(
  data: number[] | undefined,
  divRef: React.RefObject<HTMLDivElement>,
  quarterRange: string[],
) {
  if (!data) return;
  if (divRef.current && divRef.current.childNodes.length > 0) {
    return;
  }
  const div = divRef.current!;
  const maxDomain = Math.max(...data);
  const minDomain = Math.min(...data);
  const barWidth = div.clientWidth / data.length;
  const barSpacing = barWidth + 2;
  const marginLeft = 50;
  const marginRight = 50;
  const marginTop = 10;
  const marginBottom = 45;
  const chartWidth = data.length * barSpacing + marginLeft;
  const chartHeight = 400;

  const format = d3.format(",d");
  const svg = d3
    .select(divRef.current)
    .append("svg")
    .attr("width", chartWidth)
    .attr("height", chartHeight);

  const scale = d3
    .scaleLinear()
    .domain([minDomain, maxDomain])
    .range([10, 300]);

  const scaleY = d3
    .scaleLinear()
    .domain([minDomain, maxDomain])
    .range([chartHeight, 0]);

  const yAxis = d3.axisLeft(scaleY);
  const xAxis = d3
    .scaleBand()
    .domain(quarterRange)
    .range([marginLeft, chartWidth])
    .padding(0.1);

  // adding y axis
  svg.append("g").attr("transform", `translate(${marginLeft},0)`).call(yAxis);

  // adding x axis
  svg
    .append("g")
    .attr("transform", `translate(0,${chartHeight - marginBottom})`)
    .call(d3.axisBottom(xAxis).tickSizeOuter(0))
    .selectAll("text")
    .attr("y", 0)
    .attr("x", -(marginBottom + 1))
    .attr("dy", ".35em")
    .attr("transform", "rotate(-90)")
    .style("text-anchor", "start");

  // bars
  svg
    .append("g")
    .attr("transform", `translate(${marginLeft},-${marginBottom})`)
    .selectAll()
    .data(data)
    .join("rect")
    .attr("x", (d, i) => i * barSpacing + 1)
    .attr("y", (d, i) => chartHeight - scale(d))
    .attr("width", barWidth)
    .attr("height", (d, i) => scale(d))
    .attr("fill", "steelblue");

  // labels
  const text = svg
    .append("g")
    .attr("transform", `translate(${marginLeft},${-marginBottom})`)
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .selectAll()
    .data(data)
    .join("text");

  text
    .text((d) => format(d))
    .attr(
      "transform",
      (d, i) =>
        `rotate(-65,${i * barSpacing + barWidth / 2},${
          chartHeight - scale(d) - 3
        })`,
    )
    .attr("x", (d, i) => i * barSpacing + barWidth / 2)
    .attr("y", (d, i) => chartHeight - scale(d) - 3);
}

const Chart: React.FC<Props> = memo(({ data, quarterRange }) => {
  const memData = useMemo(() => data?.map((item) => item.value), [data]);
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    drawChart(memData, divRef, quarterRange);
  }, [data, divRef, quarterRange]);

  return (
    <div
      ref={divRef}
      style={{ overflowX: "scroll" }}
      id={"d3-data-chart"}
    ></div>
  );
});

export { Chart };
