import styled from "styled-components";
import { FadeInUp } from "../../global";

export const AuthFormContainer = styled.form`
  max-width: 435px;
  margin: 30px auto;
  animation: ${FadeInUp} 1s;
`;

export const SignUpTextContainer = styled.div`
  display: flex;
  margin-top: 20px;
  text-align: left;

  p {
    font-size: 18px;
    margin-right: 8px;
    @media only screen and (max-width: 370px) {
      font-size: 17px;
    }
  }

  a {
    color: #635783;
    font-size: 18px;
    @media only screen and (max-width: 370px) {
      font-size: 17px;
    }
  }
`;
