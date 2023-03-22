import styled, { keyframes } from "styled-components";

interface Props {
  isError: boolean;
}

export const PopupAnimation = keyframes`
0%{
    bottom: 0;
}
100%{
    bottom: 5%;
}
`;

export const PopupContainer = styled.div`
  position: absolute;
  left: 50%;
  bottom: 5%;
  background-color: #fff;
  min-width: 200px;
  border: 3px solid green;
  border-radius: 10px;
  padding: 10px;
  transform: translateX(-50%);
  animation: ${PopupAnimation} 1s;

  ${(props: Props) => props.isError && "border: 3px solid #e80000;"}
`;
