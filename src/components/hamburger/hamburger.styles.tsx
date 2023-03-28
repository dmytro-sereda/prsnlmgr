import styled from "styled-components";

interface Props {
  isOpen: boolean;
}

export const HamburgerContainer = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
  margin-right: 20px;
  display: none;

  &:focus-visible {
    outline: solid 3px #333;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${(props: Props) =>
      props.isOpen ? "#F0A6CA" : "#281e42"};
    border-radius: 10px;
    transition: all 0.3s;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${(props: Props) =>
        props.isOpen ? "rotate(45deg)" : "rotate(0)"};
    }

    :nth-child(2) {
      opacity: ${(props: Props) => (props.isOpen ? "0" : "1")};
      transform: ${(props: Props) =>
        props.isOpen ? "translateX(20px)" : "translateX(0)"};
    }

    :nth-child(3) {
      transform: ${(props: Props) =>
        props.isOpen ? "rotate(-45deg)" : "rotate(0)"};
    }
  }

  @media only screen and (max-width: 1400px) {
    display: flex;
  }
`;
