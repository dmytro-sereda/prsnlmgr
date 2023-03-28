import styled, { keyframes } from "styled-components";

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
  max-width: 420px;
  width: 100%;
  background-image: linear-gradient(115deg, #201639, #635784);
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  animation: ${SidebarFadeIn} 1s;
`;

export const LogoImage = styled.img`
  margin-left: 41px;
  margin-bottom: 41px;
  display: inline-block;
  max-width: 250px;
  width: 100%;
`;

export const AuthorName = styled.p`
  padding-left: 41px;

  a {
    color: #fff;
    text-decoration: none;
  }
`;

export const SidebarTopPart = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
