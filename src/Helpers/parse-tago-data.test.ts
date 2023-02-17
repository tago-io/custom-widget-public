import { parseTagoData } from "./parse-tago-data";
import { TagoData } from "~/types";

describe("parseTagoData", () => {
  it("return null when tagoData is null", () => {
    const result = parseTagoData(null);
    expect(result).toBeNull();
  });

  it("return an empty array when result is empty", () => {
    const result = parseTagoData([{ result: [] }]);
    expect(result).toEqual([]);
  });

  it("return an empty array when tagoData is empty", () => {
    const result = parseTagoData([]);
    expect(result).toEqual([]);
  });

  it("return array with expected results", () => {
    const tagoData: TagoData[] = [
      {
        result: [
          {
            variable: "chart",
            time: "2023-02-16T22:07:06.639Z",
            metadata: {
              piedata: [
                { value: 12, category: "Berries", unit: "%", label: "Taylor Farms" },
                { value: 4, category: "Berries", unit: "%", label: "JK" },
                { value: 9, category: "Berries", unit: "%", label: "JT" },
                { value: 2, category: "Default", unit: "%", label: "Taylor Farms 5" },
                { value: 6, category: "Default", unit: "%", label: "Taylor Farms 2" },
                { value: 8, category: "Default", unit: "%", label: "Taylor Farms 3" },
                { value: 9, category: "Default", unit: "%", label: "Taylor Farms 4" },
                { value: 5, category: "F.G", unit: "%", label: "Taylor Farms" },
                { value: 6, category: "Salad Mix", unit: "%", label: "Taylor Farms" },
              ],
            },
          },
        ],
      },
    ];

    const expected = [
      { value: 12, name: "Berries", unit: "%", label: "Taylor Farms" },
      { value: 4, name: "Berries", unit: "%", label: "JK" },
      { value: 9, name: "Berries", unit: "%", label: "JT" },
      { value: 2, name: "Default", unit: "%", label: "Taylor Farms 5" },
      { value: 6, name: "Default", unit: "%", label: "Taylor Farms 2" },
      { value: 8, name: "Default", unit: "%", label: "Taylor Farms 3" },
      { value: 9, name: "Default", unit: "%", label: "Taylor Farms 4" },
      { value: 5, name: "F.G", unit: "%", label: "Taylor Farms" },
      { value: 6, name: "Salad Mix", unit: "%", label: "Taylor Farms" },
    ];

    const result = parseTagoData(tagoData);
    expect(result).toEqual(expected);
  });
});
