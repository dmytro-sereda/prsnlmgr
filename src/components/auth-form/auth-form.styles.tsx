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

  p {
    font-size: 18px;
    margin-right: 8px;
  }

  a {
    color: #635783;
    font-size: 18px;
  }
`;
