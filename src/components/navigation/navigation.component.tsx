import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  NavigationContainer,
  NavigationList,
  NavigationListItem,
} from "./navigation.styles";

const Navigation: React.FC = () => {
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();

  const handleNavLinkClick = (e: React.MouseEvent<HTMLLIElement>) => {
    console.log(location.pathname);
  };

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  return (
    <NavigationContainer>
      <NavigationList>
        <NavigationListItem
          onClick={handleNavLinkClick}
          isActive={activeLink === "/createEntry"}
        >
          <Link to="/createEntry">Create an entry</Link>
        </NavigationListItem>
        <NavigationListItem isActive={activeLink === "/entries"}>
          <Link to="/entries">View entries</Link>
        </NavigationListItem>
        <NavigationListItem isActive={activeLink === "/analytics"}>
          <Link to="/analytics">Analytics</Link>
        </NavigationListItem>
      </NavigationList>
    </NavigationContainer>
  );
};

export default Navigation;
