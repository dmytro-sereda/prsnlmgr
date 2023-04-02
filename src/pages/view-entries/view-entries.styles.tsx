import styled from "styled-components";
import { FadeInUp } from "../../global";

interface Props {
  isActive: boolean;
}

export const EntriesSectionContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  animation: ${FadeInUp} 1s;

  @media only screen and (max-width: 500px) {
    margin-top: 20px;
  }
`;

export const TableLabelsContainer = styled.div`
  display: grid;
  grid-template-columns:
    minmax(200px, 20%) minmax(180px, 18%) minmax(170px, 17%)
    minmax(190px, 19%) minmax(273px, auto);
  margin-bottom: 10px;

  p {
    font-size: 21px;
    color: #382e54;
    padding-bottom: 7px;
    border-bottom: 1px solid #382e54;
  }
`;

export const EntriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const PageButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
  justify-content: center;
  align-items: center;
  animation: ${FadeInUp} 1s;

  span {
    color: #201639;
  }
`;

export const PageButton = styled.button`
  border: none;
  cursor: pointer;
  color: ${(props: Props) => (props.isActive ? "#fff" : "#201639")};
  background-color: ${(props: Props) =>
    props.isActive ? "#635784" : "#f0e6ef"};
  font-size: 18px;
  padding: 10px;
  width: 40px;
  height: 40px;
  border-radius: 4px;

  &:focus-visible {
    outline: solid #333 3px;
  }
`;

export const LastAndFirstPageButton = styled.button`
  border: none;
  cursor: pointer;
  color: ${(props: Props) => (props.isActive ? "#fff" : "#201639")};
  background-color: ${(props: Props) =>
    props.isActive ? "#635784" : "#f0e6ef"};
  font-size: 18px;
  padding: 10px;

  &:focus-visible {
    outline: solid #333 3px;
  }
`;

export const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  animation: ${FadeInUp} 1s;

  @media only screen and (max-width: 500px) {
    flex-direction: column;
    align-items: start;
    gap: 10px;
  }
`;

export const EntriesPerPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  select {
    border: none;
    border-bottom: 1px solid #382e54;

    &:focus-visible {
      outline: solid 3px #382e54;
    }
  }
`;

export const FiltersContainer = styled.div`
  display: flex;
  gap: 20px;
`;
