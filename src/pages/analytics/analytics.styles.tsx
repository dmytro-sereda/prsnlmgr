import styled, { keyframes } from "styled-components";

const ChartAppearenceAnimation = keyframes`
  0%{
    opacity: 0;
    margin-top: 20px;
  }
  
  100%{
    opacity: 1;
    margin-top: 0;
  }
`;

export const SingleValueContainer = styled.div`
  width: 210px;
  height: 210px;
  border-radius: 10px;
  background-color: #f0e6ef;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
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
  color: #625683;
`;

export const SingleValueTextValue = styled.p`
  font-size: 30px;
  font-weight: 900;
  margin: 15px 0;
  color: #625683;
`;

export const MultiValueChart = styled.div`
  max-width: 455px;
  width: 100%;
  background-color: #f0e6ef;
  border-radius: 5px;
  font-weight: 300;
  animation: ${ChartAppearenceAnimation} 1s;
`;

export const SingleValueChartsContainer = styled.div`
  display: flex;
  gap: 20px;
  animation: ${ChartAppearenceAnimation} 1s;
`;

export const ChartsContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 20px;
`;
