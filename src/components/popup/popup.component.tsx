import React from "react";
import { selectPopup } from "../../redux/helpers/helpers.selector";
import { useAppSelector } from "../../utils/hooks";
import { PopupContainer } from "./popup.styles";

const Popup: React.FC = () => {
  const popup = useAppSelector(selectPopup);
  return (
    <PopupContainer data-cy="popup" isError={popup.isError}>
      {popup.message}
    </PopupContainer>
  );
};

export default Popup;
