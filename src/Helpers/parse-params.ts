/**
 * Normalize Data from TagoIO to the EChart format
 * @param tagoData
 * @returns
 */
function parseTagoParams(tagoParams: { key: string; value: string }[] | null): { [key: string]: boolean } {
  if (!tagoParams) {
    return {};
  }

  const chartParams: { [key: string]: boolean } = {};
  for (const param of tagoParams) {
    chartParams[param.key] = param.value === "true";
  }

  return chartParams;
}

export { parseTagoParams };
