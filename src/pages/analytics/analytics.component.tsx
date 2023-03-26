import React, { useEffect, useState } from "react";
import { Heading3, PageContainer } from "../../global";
import { selectEntries } from "../../redux/user/user.selectors";
import { useAppSelector } from "../../utils/hooks";
import { EntryEntity } from "../../utils/interfaces";
import {
  SingleValueCaptionText,
  SingleValueContainer,
  SingleValueNumberValue,
  SingleValueTextValue,
} from "./analytics.styles";

const AnalyticsPage: React.FC = () => {
  // LOCAL STATE
  const [lastMonthAmount, setLastMonthAmount] = useState(0);
  const [mostSpentCategory, setMostSpentCategory] = useState("");

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

  const prepareDataForPieChart = (filteredData: EntryEntity[]) => {
    const categoriesCount: any = getCategoriesCount(filteredData);
  };

  const getCategoriesCount = (filteredData: EntryEntity[]) => {
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

      <SingleValueContainer>
        <SingleValueCaptionText>Last month</SingleValueCaptionText>
        <SingleValueNumberValue>
          ${(lastMonthAmount / 1000).toFixed(2)}k
        </SingleValueNumberValue>
        <SingleValueCaptionText>spent</SingleValueCaptionText>
      </SingleValueContainer>

      <SingleValueContainer>
        <SingleValueCaptionText>Spent most on</SingleValueCaptionText>
        <SingleValueTextValue>{mostSpentCategory}</SingleValueTextValue>
        <SingleValueCaptionText>last month</SingleValueCaptionText>
      </SingleValueContainer>
    </PageContainer>
  );
};

export default AnalyticsPage;
