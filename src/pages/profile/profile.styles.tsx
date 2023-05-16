import { FadeInUp } from "src/global";
import { colors } from "src/utils/variables";
import styled from "styled-components";

interface Props {
  isVerified?: boolean;
}

export const UserInformationContainer = styled.div`
  border-bottom: 1px solid ${colors.primaryColor};
  padding: 31px 37px;
  display: flex;
  align-items: center;
  gap: 25px;
  animation: ${FadeInUp} 1s;
  flex-wrap: wrap;

  @media only screen and (max-width: 660px) {
    justify-content: center;
  }

  @media only screen and (max-width: 450px) {
    flex-direction: column;
    gap: 15px;
  }

  @media only screen and (max-width: 500px) {
    padding: 20px;
  }
`;

export const NameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  p {
    font-size: 30px;
    font-weight: 700;
  }
`;

export const EditNameButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  transform: translateY(4px);

  &:focus-visible {
    outline: solid ${colors.primaryColor} 3px;
  }
`;

export const NameInputContainer = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;

  @media only screen and (max-width: 450px) {
    flex-direction: column;
    gap: 10px;
    width: 100%;

    input {
      border-radius: 10px;
    }

    button {
      border-radius: 10px;
      padding: 12px;
    }
  }
`;

export const NameInput = styled.input`
  border: 1px solid ${colors.primaryColor};
  border-radius: 10px 0 0 10px;
  padding: 10px;
  font-size: 18px;
  width: 300px;

  &:focus-visible {
    outline: solid ${colors.primaryColor} 1px;
  }

  @media only screen and (max-width: 500px) {
    width: auto;
  }

  @media only screen and (max-width: 450px) {
    width: 100%;
  }
`;

export const SaveNameButton = styled.button`
  background-color: ${colors.secondaryColor};
  color: #fff;
  border: none;
  cursor: pointer;
  padding: 0 15px;
  font-size: 18px;
  font-weight: 400;

  &:focus-visible {
    outline: solid ${colors.primaryColor} 3px;
  }
`;

export const CancelNameButton = styled.button`
  background-color: ${colors.dangerColor};
  cursor: pointer;
  color: #fff;
  border: none;
  padding: 0 15px;
  border-radius: 0 10px 10px 0;
  font-size: 18px;
  font-weight: 400;

  &:focus-visible {
    outline: solid ${colors.primaryColor} 3px;
  }
`;

export const UpdatePasswordSectionContainer = styled.div`
  padding: 20px 32px;
  animation: ${FadeInUp} 1s;

  @media only screen and (max-width: 500px) {
    padding: 20px;
  }
`;

export const EmailSectionContainer = styled.div`
  padding: 20px 32px;
  animation: ${FadeInUp} 1s;
  border-bottom: 1px solid ${colors.primaryColor};

  .label {
    font-size: 22px;
    margin-bottom: 6px;
  }

  button {
    font-size: 22px;
    color: ${colors.primaryColor};
    background-color: ${colors.buttonColor};
    border: none;
    border-radius: 10px;
    padding: 11px 70px;
    cursor: pointer;
    margin-top: 15px;

    &:focus-visible {
      outline: solid ${colors.primaryColor} 3px;
    }
  }

  @media only screen and (max-width: 500px) {
    padding: 20px;
  }
`;

export const VerificationMessageContainer = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

export const VerificationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`;

export const EmailText = styled.p`
  font-size: 20px;
  color: ${(props: Props) =>
    props.isVerified ? colors.primaryColor : colors.dangerColor};
`;

export const IsVerifiedText = styled.p`
  font-size: 18px;

  color: ${(props: Props) =>
    props.isVerified ? "#00AF46" : colors.dangerColor};
`;

export const DangerZoneContainer = styled.div`
  padding: 20px 32px;
  border-top: 1px solid ${colors.primaryColor};
  animation: ${FadeInUp} 1s;

  @media only screen and (max-width: 500px) {
    padding: 20px;
  }
`;

export const DeleteAccountButton = styled.button`
  background-color: ${colors.dangerColor};
  color: #fff;
  padding: 10px 20px;
  border: none;
  font-size: 18px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 10px;

  &:focus-visible {
    outline: solid ${colors.primaryColor} 3px;
  }
`;

export const UpdatePasswordForm = styled.form`
  max-width: 440px;

  @media only screen and (max-width: 440px) {
    max-width: 100%;
  }
`;
