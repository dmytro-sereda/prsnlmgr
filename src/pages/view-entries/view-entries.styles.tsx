import styled from "styled-components";

export const EntriesSectionContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
`;

export const TableLabelsContainer = styled.div`
  display: grid;
  grid-template-columns: 20% 18% 17% 19% auto;
  border-bottom: 1px solid #382e54;
  padding-bottom: 7px;
  margin-bottom: 10px;

  p {
    font-size: 21px;
    color: #382e54;
  }
`;

export const EntriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
