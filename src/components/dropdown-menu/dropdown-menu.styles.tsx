import styled from "styled-components";

export const DropdownMenuContainer = styled.div`
  position: absolute;
  background-color: #f0e6ef;
  border: 1px solid #281e42;
  display: block;
  transform: translateY(5px);
  right: 0;
  color: #281e42;
  width: 180px;

  ul {
    width: 100%;
    display: flex;
    flex-direction: column;

    li {
      list-style: none;

      &:hover {
        background-color: #281e42;
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
        color: #281e42;
        text-align: left;
        border: none;
        cursor: pointer;
        background-color: transparent;
        font-size: 18px;
      }
    }
  }
`;
