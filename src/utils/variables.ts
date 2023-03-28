import { ChartOptions } from "chart.js";

export const PieChartSectorColors = [
  "rgba(32, 22, 57, .9)",
  "rgba(99, 87, 132, .9)",
  "rgba(240, 166, 202, .9)",
  "rgba(86, 109, 131, .9)",
  "rgba(129, 77, 130, .9)",
];

export const PieChartBorderColors = [
  "rgba(44, 0, 154, 1)",
  "rgba(40, 27, 77, 1)",
  "rgba(245, 0, 119, 1)",
  "rgba(14, 63, 107, 1)",
  "rgba(105, 14, 107, 1)",
];

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const barChartOptions: ChartOptions = {
  responsive: true,
  aspectRatio: 1.5,
  plugins: {
    title: {
      display: true,
      text: `Months expenses`,
      font: {
        family: "'Inter', sans-serif",
        size: 18,
        style: "italic",
        weight: "300",
      },
    },
  },
};
