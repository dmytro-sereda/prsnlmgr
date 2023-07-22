import { colors } from "src/utils/variables";
import styled, { keyframes } from "styled-components";

const ChartAppearenceAnimation = keyframes`
  0%{
    opacity: 0;
    transform: translateY(20px);
  }
  
  100%{
    opacity: 1;
    transform: translateY(0);
  }
`;

export const SingleValueContainer = styled.div`
  width: 210px;
  height: 210px;
  border-radius: 10px;
  background-color: ${colors.tertiaryColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

export const SingleValueCaptionText = styled.p`
  font-size: 24px;
  font-weight: 400;
  font-style: italic;
`;

export const SingleValueNumberValue = styled.p`
  font-size: 50px;
  font-weight: 900;
  margin: 15px 0;
  color: ${colors.secondaryColor};
`;

export const SingleValueTextValue = styled.p`
  font-size: 30px;
  font-weight: 900;
  margin: 15px 0;
  color: ${colors.secondaryColor};
`;

export const MultiValueChart = styled.div`
  max-width: 440px;
  width: 100%;
  background-color: ${colors.tertiaryColor};
  border-radius: 5px;
  font-weight: 300;
  animation: ${ChartAppearenceAnimation} 1s;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 600px) {
    max-width: 100%;
  }
`;

export const SingleValueChartsContainer = styled.div`
  display: flex;
  gap: 20px;
  animation: ${ChartAppearenceAnimation} 1s;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

export const ChartsContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 20px;
`;

export const MonthSelect = styled.select`
  width: 100%;
  padding: 10px;
  background-color: transparent;
  border-radius: 6px 6px 0 0;

  &:focus-visible {
    outline: solid 1px ${colors.primaryColor};
  }
`;

export const NoDataAvailableMessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  min-height: 100px;
`;

export const NoDataAvailableMessage = styled.p`
  text-align: center;
  font-size: 18px;
  font-weight: 700;
`;

export const SingleAndMultiChartsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 20px;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;
