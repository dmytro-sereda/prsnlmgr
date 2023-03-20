import styled from "styled-components";

export const AuthFormContainer = styled.form`
  max-width: 435px;
  margin: 30px auto;
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
`;

export const Label = styled.label`
  font-size: 20px;
  color: #281e42;
  font-weight: 400;
`;

export const AuthFormButton = styled.button`
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
