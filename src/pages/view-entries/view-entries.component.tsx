import React from "react";
import Entry from "../../components/entry/entry.component";
import { Heading3, PageContainer } from "../../global";
import {
  EntriesSectionContainer,
  TableLabelsContainer,
} from "./view-entries.styles";

const ViewEntries: React.FC = () => {
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

        <div>
          <Entry />
        </div>
      </EntriesSectionContainer>
    </PageContainer>
  );
};

export default ViewEntries;
