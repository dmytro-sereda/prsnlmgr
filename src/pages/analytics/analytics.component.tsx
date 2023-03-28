import React, { useEffect, useState } from "react";
import { Heading3, PageContainer } from "../../global";
import { selectEntries } from "../../redux/user/user.selectors";
import { useAppSelector } from "../../utils/hooks";
import { EntryEntity } from "../../utils/interfaces";
import {
  ChartsContainer,
  MonthSelect,
  MultiValueChart,
  NoDataAvailableMessage,
  SingleValueCaptionText,
  SingleValueChartsContainer,
  SingleValueContainer,
  SingleValueNumberValue,
  SingleValueTextValue,
} from "./analytics.styles";

// CHART
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import type { ChartData } from "chart.js";
import {
  barChartOptions,
  monthNames,
  PieChartBorderColors,
  PieChartSectorColors,
} from "../../utils/variables";

// Registering charts
ChartJS.register(ArcElement, Tooltip, Legend, Title);
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsPage: React.FC = () => {
  // LOCAL STATE
  const [lastMonthAmount, setLastMonthAmount] = useState(0);
  const [mostSpentCategory, setMostSpentCategory] = useState("");
  const [categoryMonth, setCategoryMonth] = useState(new Date().getMonth());
  const [pieChartMessage, setPieChartMessage] = useState("");
  const [pieChartData, setPieChartData] =
    useState<ChartData<"pie", number[], string>>();
  const [barChartData, setBarChartData] =
    useState<ChartData<"bar", number[], string>>();

  // GLOBAL STATE
  const entries = useAppSelector(selectEntries);

  useEffect(() => {
    const filteredData = filterDataByMonth(new Date().getMonth());

    // Bar chart with amounts by months
    prepareDataForBarChart();

    // Single Value Chart with Amount Spent
    prepareLastMonthSpent(filteredData);

    // Single Value Chart with Category most spent on
    prepareMostSpentCategory(filteredData);

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const pieChartFilteredData = filterDataByMonth(categoryMonth);

    // Pie chart with categories
    if (Object.values(pieChartFilteredData).length) {
      setPieChartMessage("");
      prepareDataForPieChart(pieChartFilteredData);
    } else {
      setPieChartMessage("Sorry. There is no data for this time period");
    }

    // eslint-disable-next-line
  }, [categoryMonth]);

  const filterDataByMonth = (monthNumber: number) => {
    return entries.filter(
      (entry) =>
        entry.date > new Date(`${monthNumber + 1}/01/2023`).getTime() &&
        entry.date < new Date(`${monthNumber + 2}/01/2023`).getTime()
    );
  };

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

  const prepareDataForBarChart = () => {
    const monthsCount = getMonthsCount();
    if (Object.values(monthsCount).length === 0) return;
    const labels = Object.keys(monthsCount);
    const chartData = Object.values(monthsCount);

    const data = {
      labels,
      datasets: [
        {
          label: "2023",
          data: chartData,
          backgroundColor: "rgba(99, 87, 132, .9)",
          barThickness: 30,
        },
      ],
    };

    setBarChartData(data);
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

  const getMonthsCount = () => {
    const monthsCount: { [key: string]: number } = {};
    entries.forEach((entry) => {
      const month = new Date(entry.date).getMonth();
      monthsCount[monthNames[month]]
        ? (monthsCount[monthNames[month]] += entry.amountPaid)
        : (monthsCount[monthNames[month]] = entry.amountPaid);
    });
    return monthsCount;
  };

  const getCategoriesCount = (filteredData: EntryEntity[]) => {
    const categoriesCount: { [key: string]: number } = {};
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
            <MonthSelect
              name="categoryMonth"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setCategoryMonth(+e.currentTarget.value);
              }}
              value={categoryMonth}
            >
              <option value="0">January</option>
              <option value="1">February</option>
              <option value="2">March</option>
              <option value="3">April</option>
              <option value="4">May</option>
              <option value="5">June</option>
              <option value="6">July</option>
              <option value="7">Augusut</option>
              <option value="8">September</option>
              <option value="9">October</option>
              <option value="10">November</option>
              <option value="11">December</option>
            </MonthSelect>
            {pieChartMessage ? (
              <NoDataAvailableMessage>{pieChartMessage}</NoDataAvailableMessage>
            ) : (
              <Pie
                data={pieChartData}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: `Expenses by category in ${monthNames[categoryMonth]}`,
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
            )}
          </MultiValueChart>
        )}

        {barChartData && (
          <MultiValueChart style={{ padding: "10px" }}>
            <Bar data={barChartData} options={barChartOptions} />
          </MultiValueChart>
        )}

        <SingleValueChartsContainer>
          {lastMonthAmount > 0 && (
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
