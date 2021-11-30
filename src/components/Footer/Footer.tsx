import React, { FC } from "react";
import {
  FooterContainer,
  FooterWrap,
  FooterLinkContainer,
  FooterLinksWrapper,
  FooterLinkItems,
  FooterLinkTitle,
  FooterLink,
} from "./FooterElements";

export const Footer: FC = () => {
  function getYear() {
    return <p>{new Date().getFullYear()}</p>;
  }

  return (
    <>
      <FooterContainer>
        <FooterWrap>
          <FooterLinkContainer>
            <FooterLinksWrapper>
              <FooterLinkItems>
                <FooterLinkTitle>DMM © {getYear()}</FooterLinkTitle>
                <FooterLink to="/"></FooterLink>
              </FooterLinkItems>
            </FooterLinksWrapper>
          </FooterLinkContainer>
        </FooterWrap>
      </FooterContainer>
    </>
  );
};
