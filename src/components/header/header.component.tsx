import React from "react";
import { HeaderButton, HeaderContainer } from "./header.styles";
import LogoDark from "../../assets/logo_dark.png";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useAppSelector } from "../../utils/hooks";
import { selectUserEntity } from "../../redux/user/user.selectors";
import { Heading2 } from "../../global";

const Header: React.FC = () => {
  const currentUser = useAppSelector(selectUserEntity);
  const navigate = useNavigate();

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
        <Heading2>Heading</Heading2>
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
