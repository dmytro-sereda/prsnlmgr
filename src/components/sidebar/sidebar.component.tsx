import React from "react";
import {
  AuthorName,
  LogoImage,
  SidebarContainer,
  SidebarTopPart,
} from "./sidebar.styles";
import LogoLight from "../../assets/logo_light.png";
import Navigation from "../navigation/navigation.component";

const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <SidebarTopPart>
        <LogoImage src={LogoLight} alt="Prsnlmsg Logo" />

        <Navigation />
      </SidebarTopPart>

      <AuthorName>
        <a
          href="https://github.com/dmytro-sereda"
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
