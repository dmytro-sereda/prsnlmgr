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
  aspectRatio: 1.7,
  // aspectRatio: 1.5,
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

export const EntriesPerPageLimit = 7;

export const colors = {
  primaryColor: "#201639",
  secondaryColor: "#635784",
  tertiaryColor: "#F0E6EF",
  buttonColor: "#F0A6CA",
  dangerColor: "#AF0000",
  errorColor: "#E80000",
};

export const dataUnavailableMessage =
  "Sorry. There is no data for this time period";
