import { colors } from "src/utils/variables";
import styled from "styled-components";
interface Props {
  isActive: boolean;
}

export const NavigationContainer = styled.nav`
  width: 100%;

  @media only screen and (max-width: 500px) {
    margin: 40px 0;
  }
`;

export const NavigationList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  text-align: left;
`;

export const NavigationListItem = styled.li`
  a {
    padding: 16px 40px;
    color: #fff;
    font-size: 25px;
    text-decoration: none;
    width: 100%;
    display: inline-block;
    font-weight: 400;

    &:hover {
      ${(props: Props) =>
        !props.isActive && `background-color: ${colors.secondaryColor};`}
    }

    ${(props: Props) =>
      props.isActive &&
      `background-color: ${colors.buttonColor}; color: ${colors.primaryColor};`}

    &:focus-visible {
      outline: solid #fff 1px;
    }

    @media only screen and (max-width: 1400px) {
      text-align: center;
    }
  }
`;
