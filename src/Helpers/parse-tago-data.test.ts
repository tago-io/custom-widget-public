import { parseTagoData } from "./parse-tago-data";
import { TagoData } from "~/types";

describe("parseTagoData", () => {
  it("return null when tagoData is null", () => {
    const result = parseTagoData(null);
    expect(result).toEqual({ series: [], labels: [] });
  });

  it("return an empty array when result is empty", () => {
    const result = parseTagoData([{ result: [] }]);
    expect(result).toEqual({ series: [], labels: [] });
  });

  it("return an empty array when tagoData is empty", () => {
    const result = parseTagoData([]);
    expect(result).toEqual({ series: [], labels: [] });
  });

  it("return array with expected results", () => {
    const tagoData: TagoData[] = [
      {
        result: [
          {
            variable: "chart",
            time: "2023-02-16T22:07:06.639Z",
            metadata: {
              bardata: [
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

    const expected = {
      labels: ["Taylor Farms", "JK", "JT", "Taylor Farms 5", "Taylor Farms 2", "Taylor Farms 3", "Taylor Farms 4"],
      series: [
        { data: [12, 4, 9, 0, 0, 0, 0], name: "Berries", type: "bar" },
        { data: [0, 0, 0, 2, 6, 8, 9], name: "Default", type: "bar" },
        { data: [5, 0, 0, 0, 0, 0, 0], name: "F.G", type: "bar" },
        { data: [6, 0, 0, 0, 0, 0, 0], name: "Salad Mix", type: "bar" },
      ],
    };

    const result = parseTagoData(tagoData);
    expect(result).toEqual(expected);
  });
});
