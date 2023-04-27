import { colors } from "src/utils/variables";
import styled from "styled-components";

export const DropdownMenuContainer = styled.div`
  position: absolute;
  background-color: ${colors.tertiaryColor};
  border: 1px solid ${colors.primaryColor};
  display: block;
  transform: translateY(5px);
  right: 0;
  color: ${colors.primaryColor};
  width: 180px;

  ul {
    width: 100%;
    display: flex;
    flex-direction: column;

    li {
      list-style: none;

      &:hover {
        background-color: ${colors.primaryColor};
        color: #fff;

        a,
        button {
          color: #fff;
        }
      }

      a,
      button {
        padding: 10px 20px;
        text-decoration: none;
        display: inline-block;
        width: 100%;
        color: ${colors.primaryColor};
        text-align: left;
        border: none;
        cursor: pointer;
        background-color: transparent;
        font-size: 18px;

        &:focus-visible {
          outline: solid ${colors.primaryColor} 3px;
        }
      }
    }
  }
`;
