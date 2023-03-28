import styled from "styled-components";

export const EntryContainer = styled.div`
  display: grid;
  /* border: 1px solid #382e54; */
  grid-template-columns:
    minmax(200px, 20%) minmax(180px, 18%) minmax(170px, 17%)
    minmax(190px, 19%) minmax(174px, 17.4%) minmax(50px, auto) minmax(50px, auto);

  span,
  input,
  select,
  textarea {
    padding: 15px 6px;
    border: 1px solid #382e54;
    color: #382e54;
    font-size: 19px;

    &:nth-child(1) {
      border-radius: 9px 0 0 9px;
    }
  }
`;

export const EditButton = styled.button`
  border: 0;
  cursor: pointer;
  background-color: #fff;

  &:focus-visible {
    outline: solid 3px #333;
  }

  &:first-of-type {
    border: 1px solid #382e54;
  }
`;

export const DeleteButton = styled.button`
  background-color: #af0000;
  border: 0;
  cursor: pointer;
  border-radius: 0 9px 9px 0;

  &:focus-visible {
    outline: solid 3px #333;
  }
`;

export const DoneEditingButton = styled.button`
  font-size: 20px;
  font-weight: 700;
  background-color: #635783;
  color: #fff;
  cursor: pointer;
  border: none;
  grid-column: 6 / span 8;
  border-radius: 0 9px 9px 0;

  &:focus-visible {
    outline: solid 3px #333;
  }
`;
