import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  updateEntryBeingEdited,
  updateIsDropdownOpen,
  updateIsMenuOpen,
} from "../../redux/helpers/helpers.reducer";
import { useAppDispatch } from "../../utils/hooks";
import {
  NavigationContainer,
  NavigationList,
  NavigationListItem,
} from "./navigation.styles";

const Navigation: React.FC = () => {
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();
  const dispatch = useAppDispatch();

  const handleNavLinkClick = (e: React.MouseEvent<HTMLLIElement>) => {
    dispatch(updateIsMenuOpen(false));
  };

  useEffect(() => {
    setActiveLink(location.pathname);
    dispatch(updateIsDropdownOpen(false));
    dispatch(updateEntryBeingEdited(""));
    // eslint-disable-next-line
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
        <NavigationListItem
          onClick={handleNavLinkClick}
          isActive={activeLink === "/entries"}
        >
          <Link to="/entries">View entries</Link>
        </NavigationListItem>
        <NavigationListItem
          onClick={handleNavLinkClick}
          isActive={activeLink === "/analytics"}
        >
          <Link to="/analytics">Analytics</Link>
        </NavigationListItem>
      </NavigationList>
    </NavigationContainer>
  );
};

export default Navigation;
