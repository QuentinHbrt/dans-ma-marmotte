import React, { FC } from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';


export const Links: FC = () => {
    return (
        <nav>
            <ul>
                <li><Link to={"/"}><Button>{"Home"}</Button></Link></li>
                <li><Link to={"/StoragesPage"}><Button>{"StoragesPage"}</Button></Link></li>
                <li><Link to={"/RoomsPage"}><Button>{"StoragesPage"}</Button></Link></li>
                <li><Link to={"/ProductsPage"}><Button>{"ProductsPage"}</Button></Link></li>
            </ul>
        </nav>
    )
}