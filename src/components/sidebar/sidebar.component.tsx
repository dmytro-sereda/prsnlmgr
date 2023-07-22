import React from "react";
import {
  AuthorName,
  LogoImage,
  SidebarContainer,
  SidebarTopPart,
} from "./sidebar.styles";
import LogoLight from "../../assets/logo_light.png";
import Navigation from "../navigation/navigation.component";

const Sidebar: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    <SidebarContainer data-cy="sidebar" isOpen={isOpen}>
      <SidebarTopPart>
        <LogoImage src={LogoLight} alt="Prsnlmsg Logo" />

        <Navigation />
      </SidebarTopPart>

      <AuthorName>
        <a
          href={process.env.REACT_APP_GITHUB_URL}
          rel="noreferrer"
          target="_blank"
        >
          by Dmytro Sereda
        </a>
      </AuthorName>
    </SidebarContainer>
  );
};

export default Sidebar;
