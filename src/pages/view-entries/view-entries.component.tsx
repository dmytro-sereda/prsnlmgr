import React, { useEffect, useState } from "react";
import Entry from "../../components/entry/entry.component";
import { Heading3, PageContainer } from "../../global";
import { updateEntryBeingEdited } from "../../redux/helpers/helpers.reducer";
import { selectEntries } from "../../redux/user/user.selectors";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import {
  EntriesContainer,
  EntriesPerPageContainer,
  EntriesSectionContainer,
  FiltersContainer,
  HeadingContainer,
  // LastAndFirstPageButton,
  PageButton,
  PageButtonsContainer,
  TableLabelsContainer,
} from "./view-entries.styles";

const ViewEntriesPage: React.FC = () => {
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limitEntriesPerPage, setLimitEntriesPerPage] = useState(5);
  const [sortBy, setSortBy] = useState<
    "dateAsc" | "dateDesc" | "amountPaidAsc" | "amountPaidDesc"
  >("dateAsc");
  const [buttonsList, setButtonsList] = useState<any[]>([]);

  // GLOBAL STATE
  const entries = useAppSelector(selectEntries);
  const dispatch = useAppDispatch();

  // Divide into pages
  useEffect(() => {
    if (entries.length) {
      const newNumberOfPages = Math.ceil(entries.length / limitEntriesPerPage);
      setNumberOfPages(newNumberOfPages);

      // If the record deleted was the last one on the page, then move to the new last page
      if (currentPage > newNumberOfPages) setCurrentPage(newNumberOfPages);
    }

    // eslint-disable-next-line
  }, [entries, limitEntriesPerPage]);

  useEffect(() => {
    const buttons = [];
    for (let i = 1; i <= numberOfPages; i++) {
      buttons.push(
        <PageButton
          data-cy="paginationButton"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();

            // Disable editing mode
            if (i !== currentPage) dispatch(updateEntryBeingEdited(""));

            setCurrentPage(i);
          }}
          key={i}
          isActive={currentPage === i}
        >
          {i}
        </PageButton>
      );
    }

    setButtonsList(buttons);
    // eslint-disable-next-line
  }, [numberOfPages, currentPage]);

  return (
    <PageContainer>
      <HeadingContainer>
        <Heading3>Here are all your entries</Heading3>
        <FiltersContainer>
          <EntriesPerPageContainer>
            <label htmlFor="sortBy">Sort By</label>
            <select
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                if (
                  e.currentTarget.value === "dateAsc" ||
                  e.currentTarget.value === "dateDesc" ||
                  e.currentTarget.value === "amountPaidAsc" ||
                  e.currentTarget.value === "amountPaidDesc"
                )
                  setSortBy(e.currentTarget.value);
              }}
              name="sortBy"
              id="sortBy"
              value={sortBy}
            >
              <option value="dateAsc">Date (Asc)</option>
              <option value="dateDesc">Date (Desc)</option>
              <option value="amountPaidAsc">Amount (Asc)</option>
              <option value="amountPaidDesc">Amount (Desc)</option>
            </select>
          </EntriesPerPageContainer>
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
        </FiltersContainer>
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
              .sort((a, b) => {
                if (sortBy === "dateAsc") return a.date - b.date;
                if (sortBy === "dateDesc") return b.date - a.date;
                if (sortBy === "amountPaidDesc")
                  return b.amountPaid - a.amountPaid;
                if (sortBy === "amountPaidAsc")
                  return a.amountPaid - b.amountPaid;
                return 1;
              })
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
