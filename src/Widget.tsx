import { useRef, useEffect } from "react";
import * as echarts from "echarts";
import { EChartsOption } from "echarts";
import { ParsedData } from "./Helpers/parse-tago-data";
import { IBarParams } from "./Helpers/parse-params";

type BarChartProps = {
  data: ParsedData;
  params: IBarParams;
};

/**
 * Construct a pie chart from EChart Library
 * @param props
 * @returns
 */
function BarChart(props: BarChartProps) {
  const { data } = props;
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts>();

  const labelList = props.data.labels;
  const categoryParams = {
    type: "category",
    data: labelList,
    name: (props.params?.horizontal ? props.params.xlabel : props.params.ylabel) || "",
    nameTextStyle: {
      fontStyle: "normal",
      fontWeight: "bolder",
    },
  };
  const valueParams = {
    type: "value",
    boundaryGap: [0, 0.01],
    name: (props.params?.horizontal ? props.params.ylabel : props.params.xlabel) || "",
    nameTextStyle: {
      fontStyle: "normal",
      fontWeight: "bolder",
    },
  };
  const xAxis: any = props.params?.horizontal ? valueParams : categoryParams;
  const yAxis: any = !props.params?.horizontal ? valueParams : categoryParams;

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      chartInstance.current = chart;
      const options: EChartsOption = {
        tooltip: {
          textStyle: {
            fontSize: 12,
            lineHeight: 13,
          },
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          // formatter: (params: { data: any }) => {
          //   return `${params.data.name} <br/> ${params.data.label} <br/> ${params.data.value}`;
          // },
          displayMode: "single",
          show: true,
          renderMode: "auto",
          borderRadius: 3,
          borderWidth: 2,
        },
        legend: {
          // type: "scroll",
          // orient: "horizontal",
          // icon: "circle",
          // left: 12,
          // top: 10,
          // data: data?.map((d) => d.name),
        },
        xAxis,
        yAxis,
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        series: props.data.series,
      };

      chart.setOption(options);

      const handleResize = () => {
        chart.resize();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [data, chartRef]);

  return (
    <div style={{ width: "100%", height: "90vh" }}>
      <div ref={chartRef} style={{ width: "100%", height: "100%" }}></div>
    </div>
  );
}

export { BarChart };
