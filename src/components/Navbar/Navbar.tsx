import React, { FC } from "react";
import { FaBars } from "react-icons/fa";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";
import { useNavigate } from "react-router-dom";
import { AUTH_TOKEN } from "../../api/constants";

type NavbarProps = {
  readonly onClick?: () => void;
  readonly toggle?: () => void;
};

export const Navbar: FC<NavbarProps> = ({ toggle }) => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem(AUTH_TOKEN);

  return (
    <>
      <Nav>
        <NavbarContainer>
          <NavLogo to="/">DMM</NavLogo>
          <MobileIcon onClick={toggle}>
            <FaBars />
          </MobileIcon>
          <NavMenu>
            <NavItem>
              <NavLinks to="/">Home</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="/RoomsPage">Rooms</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="/StoragesPage">Storages</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="/ProductsPage">Products</NavLinks>
            </NavItem>
          </NavMenu>
          <>
            {authToken ? (
              <NavBtn>
                <NavBtnLink
                  onClick={() => {
                    localStorage.removeItem(AUTH_TOKEN);
                    navigate("/");
                  }}
                  to="/"
                >
                  Logout
                </NavBtnLink>
              </NavBtn>
            ) : (
              <NavBtn>
                <NavBtnLink to="/Login">Login</NavBtnLink>
              </NavBtn>
            )}
          </>
        </NavbarContainer>
      </Nav>
    </>
  );
};
