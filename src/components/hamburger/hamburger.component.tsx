import React from "react";
import { updateIsMenuOpen } from "../../redux/helpers/helpers.reducer";
import { selectIsMenuOpen } from "../../redux/helpers/helpers.selector";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { HamburgerContainer } from "./hamburger.styles";

const Hamburger: React.FC = () => {
  const isMenuOpen = useAppSelector(selectIsMenuOpen);
  const dispatch = useAppDispatch();
  return (
    <HamburgerContainer
      onClick={() => dispatch(updateIsMenuOpen(!isMenuOpen))}
      isOpen={isMenuOpen}
    >
      <div></div>
      <div></div>
      <div></div>
    </HamburgerContainer>
  );
};

export default Hamburger;
