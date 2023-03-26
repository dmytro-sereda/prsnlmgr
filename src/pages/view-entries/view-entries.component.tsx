import React from "react";
import Entry from "../../components/entry/entry.component";
import { Heading3, PageContainer } from "../../global";
import { selectEntries } from "../../redux/user/user.selectors";
import { useAppSelector } from "../../utils/hooks";
import {
  EntriesContainer,
  EntriesSectionContainer,
  TableLabelsContainer,
} from "./view-entries.styles";

const ViewEntriesPage: React.FC = () => {
  const entries = useAppSelector(selectEntries);

  return (
    <PageContainer>
      <Heading3>Here are all your entries</Heading3>

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
            entries.map((entry) => <Entry key={entry.id} entry={entry} />)
          ) : (
            <p>No entries</p>
          )}
        </EntriesContainer>
      </EntriesSectionContainer>
    </PageContainer>
  );
};

export default ViewEntriesPage;
