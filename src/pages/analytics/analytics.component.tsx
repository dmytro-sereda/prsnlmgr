import React, { useEffect, useState } from "react";
import { Heading3, PageContainer } from "../../global";
import { selectEntries } from "../../redux/user/user.selectors";
import { useAppSelector } from "../../utils/hooks";
import { EntryEntity } from "../../utils/interfaces";
import {
  ChartsContainer,
  MultiValueChart,
  SingleValueCaptionText,
  SingleValueChartsContainer,
  SingleValueContainer,
  SingleValueNumberValue,
  SingleValueTextValue,
} from "./analytics.styles";

// CHART
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";
import type { ChartData } from "chart.js";
import {
  PieChartBorderColors,
  PieChartSectorColors,
} from "../../utils/variables";

// Registering charts
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const AnalyticsPage: React.FC = () => {
  // LOCAL STATE
  const [lastMonthAmount, setLastMonthAmount] = useState(0);
  const [mostSpentCategory, setMostSpentCategory] = useState("");
  const [pieChartData, setPieChartData] =
    useState<ChartData<"pie", number[], string>>();

  // GLOBAL STATE
  const entries = useAppSelector(selectEntries);

  useEffect(() => {
    const todayTimestamp = new Date().getTime();
    const todayDay = new Date().getDate();
    const firstDayOfTheMonth = new Date().getTime() - todayDay * 86400000;
    const filteredData = entries.filter(
      (entry) => entry.date > firstDayOfTheMonth && entry.date < todayTimestamp
    );

    // Pie chart with categories
    prepareDataForPieChart(filteredData);

    // Single Value Chart with Amount Spent
    prepareLastMonthSpent(filteredData);

    // Single Value Chart with Category most spent on
    prepareMostSpentCategory(filteredData);

    // eslint-disable-next-line
  }, []);

  const calculateTopFourCategories = (
    data: {
      [key: string]: number;
    },
    topNumber: number
  ): { [key: string]: number } => {
    // Create an array of the object's key/value pairs
    const entries = Object.entries(data);

    // Sort the array by value in descending order
    entries.sort((a, b) => b[1] - a[1]);

    // Create a new object with the top 4 key/value pairs
    const topFour: { [key: string]: number } = {};
    for (let i = 0; i < topNumber && i < entries.length; i++) {
      topFour[entries[i][0]] = entries[i][1];
    }

    // Calculate others value
    const othersValue = entries
      .slice(topNumber)
      .reduce((acc, item) => (acc += item[1]), 0);

    if (othersValue) topFour["others"] = othersValue;

    return topFour;
  };

  const prepareDataForPieChart = (filteredData: EntryEntity[]) => {
    const categoriesCount = getCategoriesCount(filteredData);
    // Get top 4 items
    const topCategories = calculateTopFourCategories(categoriesCount, 4);

    const pieChartLabels = Object.keys(topCategories);
    const pieChartData = Object.values(topCategories);

    const data = {
      labels: pieChartLabels,
      title: "Expenses by category in {{month}}",
      datasets: [
        {
          data: pieChartData,
          backgroundColor: PieChartSectorColors,
          borderColor: PieChartBorderColors,
          borderWidth: 1,
        },
      ],
    };

    setPieChartData(data);
  };

  const getCategoriesCount = (
    filteredData: EntryEntity[]
  ): { [key: string]: number } => {
    const categoriesCount: any = {};
    filteredData.forEach((entry) =>
      categoriesCount[entry.category]
        ? (categoriesCount[entry.category] += entry.amountPaid)
        : (categoriesCount[entry.category] = entry.amountPaid)
    );
    return categoriesCount;
  };

  const prepareMostSpentCategory = (filteredData: EntryEntity[]) => {
    const categoriesCount: any = getCategoriesCount(filteredData);
    let maxValue = 0;
    let biggestCategory: string = "";

    for (let key of Object.keys(categoriesCount)) {
      if (categoriesCount[key] > maxValue) {
        maxValue = categoriesCount[key];
        biggestCategory = key;
      }
    }
    setMostSpentCategory(biggestCategory);
  };

  const prepareLastMonthSpent = (filteredData: EntryEntity[]) => {
    const lastMonthAmount = filteredData.reduce(
      (acc, item) => (acc += item.amountPaid),
      0
    );
    setLastMonthAmount(lastMonthAmount);
  };

  return (
    <PageContainer>
      <Heading3>Analytics based on your data</Heading3>

      <ChartsContainer>
        {pieChartData && (
          <MultiValueChart>
            <Pie
              data={pieChartData}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Expenses by category in {{monthName}}",
                    font: {
                      family: "'Inter', sans-serif",
                      size: 18,
                      style: "italic",
                      weight: "300",
                    },
                  },
                },
              }}
            />
          </MultiValueChart>
        )}

        <SingleValueChartsContainer>
          {lastMonthAmount && (
            <SingleValueContainer>
              <SingleValueCaptionText>Last month</SingleValueCaptionText>
              <SingleValueNumberValue>
                ${(lastMonthAmount / 1000).toFixed(2)}k
              </SingleValueNumberValue>
              <SingleValueCaptionText>spent</SingleValueCaptionText>
            </SingleValueContainer>
          )}

          {mostSpentCategory && (
            <SingleValueContainer>
              <SingleValueCaptionText>Spent most on</SingleValueCaptionText>
              <SingleValueTextValue>{mostSpentCategory}</SingleValueTextValue>
              <SingleValueCaptionText>last month</SingleValueCaptionText>
            </SingleValueContainer>
          )}
        </SingleValueChartsContainer>
      </ChartsContainer>
    </PageContainer>
  );
};

export default AnalyticsPage;
