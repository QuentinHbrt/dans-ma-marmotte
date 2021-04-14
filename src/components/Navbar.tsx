import React, { FC, useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav } from 'reactstrap';
import { Links } from './Links'

export const NavBar: FC = (props) => {
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);

    return (
        <nav>
            <Navbar className="navbar fixed-top navbar-dark scrolling-navbar">
                <NavbarBrand href="/" className="mr-auto">{"Dans ma marmotte"}</NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <Collapse isOpen={!collapsed} navbar>
                    <Nav navbar>
                        <Links />
                    </Nav>
                </Collapse>
            </Navbar>
        </nav>
    );
}
