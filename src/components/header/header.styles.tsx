import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 41px;
  background-color: #f0e6ef;
  border-bottom: 1px solid #22183b;
`;

export const HeaderButton = styled.button`
  background-color: #f0a6ca;
  color: #281e42;
  border-radius: 10px;
  padding: 10px 60px;
  font-size: 25px;
  cursor: pointer;
  border: 0;

  &:focus-visible {
    outline: solid #281e42 3px;
  }
`;
