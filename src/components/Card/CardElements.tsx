import styled from "styled-components";

export const CardWrapper = styled.div`
  border-radius: 18px;
  background: #000;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.9);
  text-align: center;
  margin: 20px;
  padding: 20px;
`;

export const CardTextLocation = styled.div`
  margin-top: 0px;
  font-size: 1rem;
  box-sizing: border-box;
  min-width: 0px;
  line-height: 1.2;
  margin: 10px;
  background: #fff;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
`;

export const CardTextWrapper = styled.div`
  margin: 25px;
`;

export const CardTextTitle = styled.h2`
  margin-top: 0px;
  font-size: 2rem;
  box-sizing: border-box;
  min-width: 0px;
  line-height: 1.2;
  margin: 20px;
  background: linear-gradient(
    110.78deg,
    rgb(118, 230, 80) -1.13%,
    rgb(249, 214, 73) 15.22%,
    rgb(240, 142, 53) 32.09%,
    rgb(236, 81, 87) 48.96%,
    rgb(255, 24, 189) 67.94%,
    rgb(26, 75, 255) 85.34%,
    rgb(98, 216, 249) 99.57%
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
`;

export const CardTextBody = styled.p`
  color: grey;
  font-size: 15px;
  font-weight: 300;
  margin: 40px;
  margin-bottom: -20px;
`;
