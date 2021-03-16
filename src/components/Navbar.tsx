import { Button } from '@theme-ui/components'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'

type NavbarProperties = {}

export const Navbar: FC<NavbarProperties> = () => {
    return (
        <nav>
            <Link to={"/StoragesPage"}><Button>{"StoragesPage"}</Button></Link>
            <Link to={"/ProductsPage"}><Button>{"ProductsPage"}</Button></Link>
            <Link to={"/RoomsPage"}><Button>{"Roomspage"}</Button></Link>
        </nav>
    )
}
