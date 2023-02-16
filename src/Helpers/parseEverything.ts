import { ParsedData, TagoData } from "~/types";

function parseEverything(tagoData: TagoData[] | null): ParsedData[] | null {
  if (!tagoData) {
    return null;
  }

  const allChartData: ParsedData[] = [];

  const allData = tagoData.find((e) => e)?.result.find((e) => e)?.metadata;

  if (allData) {
    for (const pieData of allData.piedata) {
      const newValue = {
        value: pieData.value,
        label: pieData.label,
        unit: pieData.unit,
        name: pieData.category,
      };
      allChartData.push(newValue);
    }
  }
  return allChartData;
}

export { parseEverything };
