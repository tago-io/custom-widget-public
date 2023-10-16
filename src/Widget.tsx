import * as echarts from "echarts";
import { DateTime } from "luxon";
import { useEffect, useRef } from "react";

import { IBarParams } from "./Helpers/parse-params";
import { ParsedData } from "./Helpers/parse-tago-data";
import { userData } from "./Helpers/parse-user";

type BarChartProps = {
  data: ParsedData;
  params: IBarParams;
  user: userData;
};

/**
 * Construct a pie chart from EChart Library
 * @param props
 * @returns
 */
function BarChart(props: BarChartProps) {
  const { data, user } = props;
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts>();

  data.series = data.series.map((serie) => ({
    ...serie,
    data: serie.data.map((item) => {
      const date = DateTime.fromISO(item[0]).setZone(user.timezone).toISO() as string;
      return [date, item[1]];
    }),
  }));

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      chartInstance.current = chart;
      const options: echarts.EChartsOption = {
        tooltip: {
          textStyle: {
            fontSize: 12,
            lineHeight: 13,
            fontWeight: "normal",
            color: "#000000",
          },
          trigger: "axis",
          axisPointer: {
            type: "line",
          },
          // formatter: (value) => {
          //   console.log(value);
          //   return "";
          // },
          displayMode: "single",
          show: true,
          renderMode: "auto",
          borderRadius: 3,
          borderWidth: 2,
        },
        legend: {
          data: data.labels,
          orient: "horizontal",
          bottom: 45,
          left: "center", // This centers the legend at the bottom,
          icon: "pin",
        },
        xAxis: {
          type: "time",
          // data: data.labels,
          // name: "Time",
          // boundaryGap: false, // This ensures the line touches the x-axis
          nameTextStyle: {
            fontStyle: "normal",
            fontWeight: "bolder",
          },
        },
        yAxis: {
          type: "value",
          // name: "Bin Level",
          nameTextStyle: {
            fontStyle: "normal",
            fontWeight: "normal",
          },
          splitLine: {
            lineStyle: {
              color: "#c3c3c3",
            },
          },
        },
        grid: {
          top: "10%",
          left: "3%",
          right: "4%",
          bottom: "26%",
          containLabel: true,
        },
        dataZoom: [
          {
            type: "slider",
            xAxisIndex: [0], // This applies the zoom to the first (and in this case, the only) x-axis.
            start: 0, // Initial start percentage
            end: 100, // Initial end percentage
          },
        ],
        series: data.series,
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
