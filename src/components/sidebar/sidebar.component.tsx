import React from "react";
import { LogoImage, SidebarContainer } from "./sidebar.styles";
import LogoLight from "../../assets/logo_light.png";
import Navigation from "../navigation/navigation.component";

const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <LogoImage src={LogoLight} alt="Prsnlmsg Logo" />

      <Navigation />
    </SidebarContainer>
  );
};

export default Sidebar;
