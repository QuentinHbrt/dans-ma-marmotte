import styled from "styled-components";

export const ProductContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background: #0c0c0c;
  padding: 0 30px;
  height: 0 auto;
`;

export const ProductContent = styled.div`
  max-width: 1200px;
  position: relative;
  padding: 8px 24px;
`;

export const ProductH1 = styled.h1`
  color: #fff;
  font-size: 48px;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 40px;
  }

  @media screen and (max-width: 480px) {
    font-size: 32px;
  }
`;

export const ProductP = styled.p`
  margin-top: 24px;
  color: #fff;
  font-size: 24px;
  text-align: center;
  max-width: 600px;

  @media screen and (max-width: 768px) {
    font-size: 24px;
  }

  @media screen and (max-width: 480px) {
    font-size: 18px;
  }
`;

export const ProductsList = styled.div`
  display: flex;
  justify-content: flex-end;
`;
