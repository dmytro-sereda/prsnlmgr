import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import Entry from "../../components/entry/entry.component";
import { db } from "../../firebase";
import { Heading3, PageContainer } from "../../global";
import { selectUserEntity } from "../../redux/user/user.selectors";
import { useAppSelector } from "../../utils/hooks";
import { EntryEntity } from "../../utils/interfaces";
import {
  EntriesContainer,
  EntriesSectionContainer,
  TableLabelsContainer,
} from "./view-entries.styles";

const ViewEntries: React.FC = () => {
  const [entries, setEntries] = useState<[] | EntryEntity[]>([]);
  const user = useAppSelector(selectUserEntity);

  useEffect(() => {
    const starCountRef = ref(db, `/entries/${user?.userID}`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const entriesArray: [] | EntryEntity[] = Object.values(data);
      setEntries(entriesArray);
    });
    // eslint-disable-next-line
  }, []);

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

export default ViewEntries;
