import React from "react";
import { SidebarContainer } from "./sidebar.styles";
import LogoLight from "../../assets/logo_light.png";

const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <img src={LogoLight} alt="Prsnlmsg Logo" />
    </SidebarContainer>
  );
};

export default Sidebar;
