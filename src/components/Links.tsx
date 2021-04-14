import React, { FC } from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';


export const Links: FC = () => {
    return (
        <nav>
            <ul>
                <li><Link to={"/"}><Button>{"Home"}</Button></Link></li>
                <li><Link to={"/StoragesPage"}><Button>{"Storages"}</Button></Link></li>
                <li><Link to={"/RoomsPage"}><Button>{"Rooms"}</Button></Link></li>
                <li><Link to={"/ProductsPage"}><Button>{"Products"}</Button></Link></li>
            </ul>
        </nav>
    )
}