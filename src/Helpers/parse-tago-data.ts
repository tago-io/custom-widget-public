import { TagoData } from "~/types";

type category = string;
export interface ParsedData {
  series: {
    name: category;
    type: "bar";
    data: number[];
  }[];

  labels: string[];
}

/**
 * Normalize Data from TagoIO to the EChart format
 * @param tagoData
 * @returns
 */
function parseTagoData(tagoData: TagoData[] | null): ParsedData | null {
  const allChartData: ParsedData = { series: [], labels: [] };

  if (!tagoData || tagoData.length === 0) {
    return allChartData;
  }

  const allData = tagoData.find((e) => e)?.result.find((e) => e)?.metadata;
  if (!allData?.bardata || allData.bardata.length === 0) {
    return allChartData;
  }

  const labelSet = new Set(allData.bardata.map((e) => e.label));
  allChartData.labels = Array.from(labelSet.values());

  const categorySet = new Set(allData.bardata.map((e) => e.category));
  const categories = Array.from(categorySet.values());

  // iterate on labelSet values without downlevelIteration
  for (const category of categories) {
    // const dataList = allData.bardata.filter((e) => e.category === category);
    allChartData.series.push({
      name: category,
      type: "bar",
      data: Array(allChartData.labels.length).fill(0),
    });
  }

  for (const barData of allData.bardata) {
    const serie = allChartData.series.find((e) => e.name === barData.category);
    if (!serie) {
      continue;
    }
    const labelIndex = allChartData.labels.findIndex((e) => e === barData.label);
    serie.data[labelIndex] = barData.value;
  }

  return allChartData;
}

export { parseTagoData };
