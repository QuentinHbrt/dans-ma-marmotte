import React, { FC } from "react";
import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarWrapper,
  SidebarMenu,
  SidebarLink,
} from "./SidebarElements";

type SidebarProps = {
  readonly isOpen: boolean;
  readonly onClick?: () => void;
  readonly toggle?: () => void;
};

export const Sidebar: FC<SidebarProps> = ({ isOpen, toggle }) => {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink to="/" onClick={toggle}>
            {"Home"}
          </SidebarLink>
          <SidebarLink to={"/RoomsPage"} onClick={toggle}>
            {"Rooms"}
          </SidebarLink>
          <SidebarLink to="StoragesPage" onClick={toggle}>
            {"Storages"}
          </SidebarLink>
          <SidebarLink to="ProductsPage" onClick={toggle}>
            {"Products"}
          </SidebarLink>
        </SidebarMenu>
      </SidebarWrapper>
    </SidebarContainer>
  );
};
