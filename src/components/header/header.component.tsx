import React, { useEffect, useState } from "react";
import {
  HeaderButton,
  HeaderContainer,
  LeftSideHeader,
  ProfileButton,
  ProfileContainer,
} from "./header.styles";
import LogoDark from "../../assets/logo_dark.png";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { selectUserEntity } from "../../redux/user/user.selectors";
import { Heading2 } from "../../global";
import Hamburger from "../hamburger/hamburger.component";
import { Icon } from "@iconify/react";
import DropdownMenu from "../dropdown-menu/dropdown-menu.component";
import { selectIsDropdownOpen } from "src/redux/helpers/helpers.selector";
import { updateIsDropdownOpen } from "src/redux/helpers/helpers.reducer";
import { colors } from "src/utils/variables";

const Header: React.FC = () => {
  const currentUser = useAppSelector(selectUserEntity);
  const isDropdownOpen = useAppSelector(selectIsDropdownOpen);
  const [heading, setHeading] = useState("");
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    switch (location.pathname) {
      case "/createEntry":
        setHeading("Create entry");
        break;
      case "/entries":
        setHeading("Entries");
        break;
      case "/analytics":
        setHeading("Analytics");
        break;
      case "/profile":
        setHeading("Profile");
        break;
      default:
    }
  }, [location]);

  return (
    <HeaderContainer>
      <LeftSideHeader>
        {!currentUser ? (
          <img src={LogoDark} alt="PrsnlMgr Logo" className="logo" />
        ) : (
          <>
            <Hamburger />
            <Heading2>{heading}</Heading2>
          </>
        )}
      </LeftSideHeader>
      {currentUser ? (
        <>
          <ProfileContainer>
            <ProfileButton
              data-cy="profileButton"
              onClick={() => {
                dispatch(updateIsDropdownOpen(!isDropdownOpen));
              }}
            >
              <Icon
                icon="mdi:user-circle"
                width="40"
                color={colors.primaryColor}
              />
              <Icon
                icon="ph:caret-down-fill"
                height="12"
                color={colors.primaryColor}
              />
            </ProfileButton>
            {isDropdownOpen && <DropdownMenu />}
          </ProfileContainer>
        </>
      ) : (
        <Link to="/login">
          <HeaderButton>Log In</HeaderButton>
        </Link>
      )}
    </HeaderContainer>
  );
};

export default Header;
