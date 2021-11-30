import styled from "styled-components";

export const RoomContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background: #0c0c0c;
  padding: 0 30px;
  height: 0 auto;
`;

export const RoomContent = styled.div`
  max-width: 1200px;
  position: relative;
  padding: 8px 24px;
`;

export const RoomH1 = styled.h1`
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

export const RoomP = styled.p`
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

export const RoomsList = styled.div``;
