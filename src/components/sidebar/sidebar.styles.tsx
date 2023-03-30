import styled, { keyframes } from "styled-components";

interface Props {
  isOpen: boolean;
}

const SidebarFadeIn = keyframes`
  0%{
    transform: translateX(-40px);
    opacity: 0;
  }
  
  100%{
    transform: translateX(0);
    opacity: 1;
  }
`;

export const SidebarContainer = styled.div`
  min-height: 100vh;
  width: 420px;
  background-image: linear-gradient(115deg, #201639, #635784);
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  animation: ${SidebarFadeIn} 1s;
  transition: all 0.4s;

  @media only screen and (max-width: 1400px) {
    position: fixed;
    width: 100vw;
    max-width: 100%;
    transform: ${(props: Props) =>
      props.isOpen ? "translateX(0%)" : "translateX(-100%)"};
    animation: none;
  }

  @media only screen and (max-width: 500px) {
    justify-content: center;
  }
`;

export const LogoImage = styled.img`
  margin-left: 41px;
  margin-bottom: 41px;
  display: inline-block;
  max-width: 250px;
  width: 100%;

  @media only screen and (max-width: 1400px) {
    width: 70%;
    margin: 5px auto 70px;
  }

  @media only screen and (max-width: 500px) {
    margin: 0 auto;
  }
`;

export const AuthorName = styled.p`
  padding-left: 41px;

  a {
    color: #fff;
    text-decoration: none;
  }

  @media only screen and (max-width: 1400px) {
    margin: 0 auto;
    padding: 0;
  }
`;

export const SidebarTopPart = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
