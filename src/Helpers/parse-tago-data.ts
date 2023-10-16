import { TagoData } from "~/types";

type binName = string;
export interface ParsedData {
  series: {
    name: binName;
    type: "line";
    data: [string, number][];
  }[];

  labels: string[];
}

/**
 * Normalize Data from TagoIO to the EChart format
 * @param tagoData
 * @returns
 */
function parseTagoData(tagoData: TagoData[] | null): ParsedData {
  const allChartData: ParsedData = { series: [], labels: [] };

  if (!tagoData || tagoData.length === 0) {
    return allChartData;
  }

  const dataList = tagoData
    .map((item) => item.result)
    .flat()
    .filter((x) => x.metadata);

  dataList.forEach((item) => {
    if (!item.metadata) {
      return;
    }

    const seriesData = {
      name: item.value as string,
      type: "line",
      data: Object.keys(item.metadata)
        .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
        .map((key) => [key, item.metadata?.[key]]),
    };

    allChartData.series.push(seriesData as any);

    allChartData.labels.push(item.value as string);
  });

  return allChartData;
}

export { parseTagoData };
