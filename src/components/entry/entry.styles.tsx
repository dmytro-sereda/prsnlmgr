import { colors } from "src/utils/variables";
import styled from "styled-components";

export const EntryContainer = styled.div`
  display: grid;
  grid-template-columns:
    minmax(200px, 20%) minmax(180px, 18%) minmax(170px, 17%)
    minmax(190px, 19%) minmax(174px, 17.4%) minmax(50px, auto) minmax(50px, auto);

  span,
  input,
  select,
  textarea {
    padding: 15px 6px;
    border: 1px solid ${colors.primaryColor};
    color: ${colors.primaryColor};
    font-size: 19px;
    max-height: 60px;
    overflow: auto;

    &:nth-child(1) {
      border-radius: 9px 0 0 9px;
    }

    &.error {
      border: 2px solid red;
    }
  }
`;

export const EditButton = styled.button`
  border: 0;
  cursor: pointer;
  background-color: #fff;

  &:focus-visible {
    outline: solid 3px ${colors.primaryColor};
  }

  &:first-of-type {
    border: 1px solid ${colors.primaryColor};
  }
`;

export const DeleteButton = styled.button`
  background-color: ${colors.dangerColor};
  border: 0;
  cursor: pointer;
  border-radius: 0 9px 9px 0;

  &:focus-visible {
    outline: solid 3px ${colors.primaryColor};
  }
`;

export const DoneEditingButton = styled.button`
  font-size: 20px;
  font-weight: 700;
  background-color: ${colors.secondaryColor};
  color: #fff;
  cursor: pointer;
  border: none;
  grid-column: 6 / span 8;
  border-radius: 0 9px 9px 0;

  &:focus-visible {
    outline: solid 3px ${colors.primaryColor};
  }
`;
