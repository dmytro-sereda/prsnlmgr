import React, { useEffect, useState } from "react";
import { HeaderButton, HeaderContainer } from "./header.styles";
import LogoDark from "../../assets/logo_dark.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useAppSelector } from "../../utils/hooks";
import { selectUserEntity } from "../../redux/user/user.selectors";
import { Heading2 } from "../../global";

const Header: React.FC = () => {
  const currentUser = useAppSelector(selectUserEntity);
  const [heading, setHeading] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

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
      default:
    }
  }, [location]);

  const handleLogOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {});
  };

  return (
    <HeaderContainer>
      {!currentUser ? (
        <img src={LogoDark} alt="PrsnlMgr Logo" />
      ) : (
        <Heading2>{heading}</Heading2>
      )}
      {currentUser ? (
        <HeaderButton onClick={handleLogOut}>Log out</HeaderButton>
      ) : (
        <Link to="/login">
          <HeaderButton>Log In</HeaderButton>
        </Link>
      )}
    </HeaderContainer>
  );
};

export default Header;
