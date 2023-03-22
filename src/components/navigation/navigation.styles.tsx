import styled from "styled-components";
interface Props {
  isActive: boolean;
}

export const NavigationContainer = styled.nav`
  width: 100%;
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
      ${(props: Props) => !props.isActive && "background-color: #635784;"}
    }

    ${(props: Props) =>
      props.isActive && "background-color: #F0A6CA; color: #382E54;"}

    &:focus-visible {
      outline: solid #fff 1px;
    }
  }
`;
