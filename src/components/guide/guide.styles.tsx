import { colors } from "src/utils/variables";
import styled from "styled-components";

interface Props {
  position: number;
}

export const GuideContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  background-color: ${colors.tertiaryColor};
  z-index: 11;
`;

export const SliderContainer = styled.div`
  position: relative;
  text-align: center;
`;

export const Slide = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.4s;
  justify-content: center;
  padding: 30px;
  ${(props: Props) => `transform: translateX(${props.position * 100}%);`}

  img {
    width: 70%;
    margin: 20px 0;

    @media only screen and (max-width: 650px) {
      width: 100%;
    }
  }

  &:nth-child(2) img,
  &:nth-child(3) img {
    height: 70%;
    width: auto;
    margin: 20px 0;
  }

  @media only screen and (max-width: 1000px) {
    &:nth-child(3) img {
      width: 100%;
      height: auto;
    }

    img {
      width: 90%;
    }
  }

  @media only screen and (max-width: 650px) {
    &:nth-child(3) img {
      width: 100%;
      height: auto;
    }
  }

  @media only screen and (max-width: 450px) {
    &:nth-child(2) img {
      width: 100%;
      height: auto;
    }
  }
`;

export const SlideDescription = styled.p`
  font-size: 22px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 15px;
`;

export const NextStepButton = styled.button`
  border: none;
  background-color: ${colors.primaryColor};
  color: #fff;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 18px;
  border-radius: 10px;

  &:focus-visible {
    outline: solid ${colors.secondaryColor} 3px;
  }
`;

export const PreviousStepButton = styled.button`
  background-color: ${colors.secondaryColor};
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 18px;
  padding: 10px 20px;
  border-radius: 10px;

  &:focus-visible {
    outline: solid ${colors.primaryColor} 3px;
  }
`;
