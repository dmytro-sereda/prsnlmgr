import styled from "styled-components";
import { FadeInUp } from "../../global";

export const ClaimFormContainer = styled.form`
  max-width: 440px;
  margin-top: 21px;
  animation: ${FadeInUp} 1s;

  @media only screen and (max-width: 600px) {
    max-width: 100%;
  }
`;
