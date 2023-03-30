import styled, { createGlobalStyle, keyframes } from "styled-components";

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
  border: 1px solid #281e42;
  border-radius: 10px;
  padding: 10px;
  font-size: 18px;
  margin-top: 10px;
  ${(props: InputProps) => props.isError && "border: 1px solid #e80000;"}

  &:focus-visible {
    outline: solid #281e42 1px;
  }
`;

export const Label = styled.label`
  font-size: 20px;
  color: #281e42;
  font-weight: 400;
`;

export const Heading2 = styled.h2`
  font-weight: 700;
  font-size: 40px;
  color: #281e42;
`;

export const Heading3 = styled.h3`
  font-weight: 700;
  font-size: 30px;
  color: #281e42;
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
  border: 1px solid #281e42;
  border-radius: 10px;
  padding: 10px;
  font-size: 18px;
  margin-top: 10px;
  ${(props: InputProps) => props.isError && "border: 1px solid #e80000;"}

  &:focus-visible {
    outline: solid #281e42 1px;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  border: 1px solid #281e42;
  border-radius: 10px;
  padding: 10px;
  font-size: 18px;
  margin-top: 10px;

  &:focus-visible {
    outline: solid #281e42 1px;
  }
`;

export const PrimaryButton = styled.button`
  width: 100%;
  border: 0;
  background-color: #f0a6ca;
  font-size: 25px;
  color: #281e42;
  font-weight: 400;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 10px;

  &:focus-visible {
    outline: solid #281e42 3px;
  }
`;

export const RequiredStar = styled.span`
  color: #635784;
`;

export const RequiredText = styled.p`
  color: #635784;
  font-size: 20px;
  margin-top: 10px;
  animation: ${FadeInUp} 1s;
`;

export const ErrorMessage = styled.p`
  color: #e80000;
  margin-top: 5px;
  font-size: 17px;
`;

export const AuthPageContainer = styled.div`
  padding: 30px;
`;
