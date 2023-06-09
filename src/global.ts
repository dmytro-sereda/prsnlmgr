import styled, { createGlobalStyle, keyframes } from "styled-components";
import { colors } from "./utils/variables";

interface InputProps {
  isError?: string | undefined;
}

export const FadeInUp = keyframes`
  0%{
    opacity: 0;
    transform: translateY(50px);
  }

  100%{
    opacity: 1;
    transform: translateY(0);
  }
`;

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline:0;
        box-sizing:border-box;
        font-family: 'Inter', sans-serif;
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

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-bottom: 15px;
`;

export const Input = styled.input`
  width: 100%;
  border: 1px solid ${colors.primaryColor};
  border-radius: 10px;
  padding: 10px;
  font-size: 18px;
  margin-top: 10px;

  ${(props: InputProps) =>
    props.isError && `border: 1px solid ${colors.errorColor};`}

  &:focus-visible {
    outline: solid ${colors.primaryColor} 1px;
  }
`;

export const Label = styled.label`
  font-size: 20px;
  color: ${colors.primaryColor};
  font-weight: 400;
`;

export const Heading2 = styled.h2`
  font-weight: 700;
  font-size: 40px;
  color: ${colors.primaryColor};
`;

export const Heading3 = styled.h3`
  font-weight: 700;
  font-size: 30px;
  color: ${colors.primaryColor};
  animation: ${FadeInUp} 1s;
`;

export const PageContainer = styled.div`
  text-align: left;
  padding: 44px 32px;

  @media only screen and (max-width: 600px) {
    padding: 20px;
  }
`;

export const Select = styled.select`
  width: 100%;
  border: 1px solid ${colors.primaryColor};
  border-radius: 10px;
  padding: 10px;
  font-size: 18px;
  margin-top: 10px;
  ${(props: InputProps) =>
    props.isError && `border: 1px solid ${colors.errorColor};`}

  &:focus-visible {
    outline: solid ${colors.primaryColor} 1px;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  border: 1px solid ${colors.primaryColor};
  border-radius: 10px;
  padding: 10px;
  font-size: 18px;
  margin-top: 10px;

  &:focus-visible {
    outline: solid ${colors.primaryColor} 1px;
  }
`;

export const PrimaryButton = styled.button`
  width: 100%;
  border: 0;
  background-color: ${colors.buttonColor};
  font-size: 25px;
  color: ${colors.primaryColor};
  font-weight: 400;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 10px;

  &:focus-visible {
    outline: solid ${colors.primaryColor} 3px;
  }
`;

export const RequiredStar = styled.span`
  color: ${colors.secondaryColor};
`;

export const RequiredText = styled.p`
  color: ${colors.secondaryColor};
  font-size: 20px;
  margin-top: 10px;
  animation: ${FadeInUp} 1s;
`;

export const ErrorMessage = styled.p`
  color: ${colors.errorColor};
  margin-top: 5px;
  font-size: 17px;
`;

export const AuthPageContainer = styled.div`
  padding: 30px;
  text-align: center;

  @media only screen and (max-width: 600px) {
    padding: 20px;
  }

  @media only screen and (max-width: 370px) {
    padding: 10px;
  }
`;
