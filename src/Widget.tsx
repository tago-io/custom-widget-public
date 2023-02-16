import { useRef, useEffect } from "react";
import * as echarts from "echarts";
import { EChartsOption } from "echarts";

type PieChartProps = {
  data: { name: string; value: number }[];
};

function PieChart(props: PieChartProps) {
  const { data } = props;
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts>();

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      chartInstance.current = chart;
      const options: EChartsOption = {
        // @ts-expect-error wrong types
        tooltip: {
          textStyle: {
            fontSize: 12,
            lineHeight: 13,
          },
          trigger: "item",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formatter: (params: { data: any }) => {
            return `${params.data.name} <br/> ${params.data.label} <br/> ${params.data.value}`;
          },
          displayMode: "single",
          show: true,
          renderMode: "auto",
          borderRadius: 3,
          borderWidth: 2,
        },
        legend: {
          type: "scroll",
          orient: "horizontal",
          icon: "circle",
          left: 12,
          top: 10,
          data: data?.map((d) => d.name),
        },
        series: [
          {
            name: "Pie Chart",
            type: "pie",
            radius: "60%",
            center: ["50%", "50%"],

            data: data,
            label: {
              fontSize: 12,
              formatter: (params) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return `${(params.data as any).label} \n ${params.percent}%`;
              },
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
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

  return <div ref={chartRef} style={{ width: "100%", height: "500px" }}></div>;
}

export { PieChart };
