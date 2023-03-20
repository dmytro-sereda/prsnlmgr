import styled, { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline:0;
        box-sizing:border-box;
        font-family: 'Arial', sans-serif; 
    }

    #root{
        margin:0 auto;
        height: 100%;
        white-space: pre-line;
    }

    html,
    body {
        height: 100%;
        margin: 0;
    }

`;

export const ApplicationContainer = styled.div`
  display: flex;
`;

export const ApplicationRightSideContainer = styled.div`
  width: 100%;
`;

export const Heading2 = styled.h2`
  font-weight: 700;
  font-size: 40px;
  color: #281e42;
`;
