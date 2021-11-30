import React, { useState } from "react";
import {
  HeroContainer,
  HeroBg,
  ImgBg,
  HeroContent,
  HeroH1,
  HeroP,
  HeroBtnWrapper,
  ArrowForward,
  ArrowRight,
} from "./HeroElements";
import img from "../../img/montagne.jpg";
import { Button } from "../Button/ButtonElement";

export default function Hero() {
  const [hover, setHover] = useState(false);

  const onHover = () => {
    setHover(!hover);
  };

  return (
    <HeroContainer>
      <HeroBg>
        <ImgBg src={img} />
      </HeroBg>
      <HeroContent>
        <HeroH1>{"INVENTAIRE"}</HeroH1>
        <HeroP>{"Une facon simple d'organiser ses affaires"}</HeroP>
        <HeroBtnWrapper>
          <Button
            to="RoomsPage"
            onMouseEnter={onHover}
            onMouseLeave={onHover}
            primary="true"
            dark="true"
          >
            {"Get started"}
            {hover ? <ArrowForward /> : <ArrowRight />}
          </Button>
        </HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
  );
}
