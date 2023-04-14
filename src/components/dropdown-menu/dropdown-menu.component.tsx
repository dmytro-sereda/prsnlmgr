import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { DropdownMenuContainer } from "./dropdown-menu.styles";
import { useAppDispatch, useAppSelector } from "src/utils/hooks";
import { updateIsDropdownOpen } from "src/redux/helpers/helpers.reducer";
import { selectIsDropdownOpen } from "src/redux/helpers/helpers.selector";

const DropdownMenu: React.FC = () => {
  const isDropdownOpen = useAppSelector(selectIsDropdownOpen);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(updateIsDropdownOpen(!isDropdownOpen));
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {});
  };

  return (
    <DropdownMenuContainer>
      <ul>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <button onClick={handleLogOut}> Log out</button>
        </li>
      </ul>
    </DropdownMenuContainer>
  );
};

export default DropdownMenu;
