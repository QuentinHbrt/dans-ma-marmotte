import { Button } from '@theme-ui/components'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'

type NavbarProperties = {}

export const Navbar: FC<NavbarProperties> = () => {
    return (
        <nav>
            <Link to={"/ProductForm"}><Button>{"ProductForm"}</Button></Link>
            <Link to={"/RoomForm"}><Button>{"RoomForm"}</Button></Link>
            <Link to={"/StorageForm"}><Button>{"StorageForm"}</Button></Link>
            <Link to={"/ProductsList"}><Button>{"ProductsList"}</Button></Link>
            <Link to={"/RoomsList"}><Button>{"RoomsList"}</Button></Link>
            <Link to={"/StoragesList"}><Button>{"StoragesList"}</Button></Link>
        </nav>
    )
}
