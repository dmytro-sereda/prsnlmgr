import { colors } from "src/utils/variables";
import styled, { keyframes } from "styled-components";

const HeaderFadeIn = keyframes`
  0%{
    transform: translateY(-40px);
    opacity: 0;
  }
  
  100%{
    transform: translateY(0);
    opacity: 1;
  }
`;

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 41px;
  background-color: ${colors.tertiaryColor};
  border-bottom: 1px solid ${colors.primaryColor};
  animation: ${HeaderFadeIn} 1s;

  .logo {
    width: 80%;
    display: inline-block;
  }

  @media only screen and (max-width: 600px) {
    padding: 20px;

    h2 {
      display: none;
    }

    button {
      font-size: 18px;
    }
  }

  @media only screen and (max-width: 370px) {
    padding: 15px 10px;
  }
`;

export const HeaderButton = styled.button`
  background-color: ${colors.buttonColor};
  color: #281e42;
  border-radius: 10px;
  padding: 10px 60px;
  font-size: 25px;
  cursor: pointer;
  border: 0;

  &:focus-visible {
    outline: solid ${colors.primaryColor} 3px;
  }

  @media only screen and (max-width: 500px) {
    padding: 10px 20px;
    min-width: 130px;
  }
`;

export const LeftSideHeader = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

export const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:focus-visible {
    outline: 3px solid ${colors.primaryColor};
  }
`;

export const ProfileContainer = styled.div`
  position: relative;
`;
