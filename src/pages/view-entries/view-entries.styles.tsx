import styled from "styled-components";

export const EntriesSectionContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

export const TableLabelsContainer = styled.div`
  display: grid;
  grid-template-columns:
    minmax(200px, 20%) minmax(180px, 18%) minmax(170px, 17%)
    minmax(190px, 19%) minmax(273px, auto);
  padding-bottom: 7px;
  margin-bottom: 10px;

  p {
    font-size: 21px;
    color: #382e54;
    border-bottom: 1px solid #382e54;
  }
`;

export const EntriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
