import styled from "styled-components";

export const EntryContainer = styled.div`
  display: grid;
  border: 1px solid #382e54;
  grid-template-columns: 20% 18% 17% 19% 17.4% auto auto;
  border-radius: 10px;
  /* overflow: hidden; */

  span,
  input,
  select,
  textarea {
    padding: 15px 6px;
    border-left: 1px solid #382e54;
    border-right: 1px solid #382e54;
    color: #382e54;

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
