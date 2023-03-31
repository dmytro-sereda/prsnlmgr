import React, { useEffect, useState } from "react";
import Entry from "../../components/entry/entry.component";
import { Heading3, PageContainer } from "../../global";
import { selectEntries } from "../../redux/user/user.selectors";
import { useAppSelector } from "../../utils/hooks";
import {
  EntriesContainer,
  EntriesPerPageContainer,
  EntriesSectionContainer,
  HeadingContainer,
  // LastAndFirstPageButton,
  PageButton,
  PageButtonsContainer,
  TableLabelsContainer,
} from "./view-entries.styles";

const ViewEntriesPage: React.FC = () => {
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [limitEntriesPerPage, setLimitEntriesPerPage] = useState(5);

  // GLOBAL STATE
  const entries = useAppSelector(selectEntries);

  // Divide into pages
  const buttonsList = [];
  for (let i = 1; i <= numberOfPages; i++) {
    buttonsList.push(
      <PageButton
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          setCurrentPage(i);
        }}
        key={i}
        isActive={currentPage === i}
      >
        {i}
      </PageButton>
    );
  }

  useEffect(() => {
    setNumberOfPages(Math.ceil(entries.length / limitEntriesPerPage));
    setCurrentPage(1);
    // eslint-disable-next-line
  }, []);

  return (
    <PageContainer>
      <HeadingContainer>
        <Heading3>Here are all your entries</Heading3>
        <EntriesPerPageContainer>
          <label htmlFor="entriesPerPage">Entries per page</label>
          <select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setLimitEntriesPerPage(+e.currentTarget.value);
            }}
            name="entriesPerPage"
            id="entriesPerPage"
            value={limitEntriesPerPage}
          >
            <option value="5">5</option>
            <option value="7">7</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </EntriesPerPageContainer>
      </HeadingContainer>

      <EntriesSectionContainer>
        <TableLabelsContainer>
          <p>Item name</p>
          <p>Amount paid</p>
          <p>Date</p>
          <p>Category</p>
          <p>Additional Info</p>
        </TableLabelsContainer>

        <EntriesContainer>
          {entries.length !== 0 ? (
            [...entries]
              .sort((a, b) => a.date - b.date)
              .slice(
                (currentPage - 1) * limitEntriesPerPage,
                (currentPage - 1) * limitEntriesPerPage + limitEntriesPerPage
              )
              .map((entry) => <Entry key={entry.id} entry={entry} />)
          ) : (
            <p>No entries</p>
          )}
        </EntriesContainer>
      </EntriesSectionContainer>
      <PageButtonsContainer>
        {buttonsList.length > 1 && buttonsList}
      </PageButtonsContainer>
    </PageContainer>
  );
};

export default ViewEntriesPage;
