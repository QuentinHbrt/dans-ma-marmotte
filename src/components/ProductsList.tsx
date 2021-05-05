
import React, { FC, useState } from 'react';
import { Product, Room, Storage } from '../api/types';
import { ProductItem } from './ProductItem';
import { SearchItem } from './SearchItem';

type ProductsListProps = {
    title?: string;
    products: Product[];
    storages: Storage[];
    rooms: Room[];
    onDeleteProduct: (productToRemove: Product) => void
}

export const ProductsList: FC<ProductsListProps> = (props) => {

    const arrayOfProducts = [...props.products]
    arrayOfProducts.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    arrayOfProducts.forEach(x => (x))

    const [searchTerm, setSearchTerm] = useState('')
    const BarStyling = { width: "20rem", background: "#F2F1F9", border: "none", padding: "0.5rem" };

    return (
        <div>
            <input
                style={BarStyling}
                value={searchTerm}
                placeholder={"search"}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul className="d-flex justify-content-center">
                <li>
                    {
                        arrayOfProducts.filter((value) => {
                            if (searchTerm === "") {
                                return value
                            } else if (value.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                                return value
                            }
                        }).map((product) => {
                            const foundStorage = props.storages.find(storage => storage.id === product.category)
                            const foundRoom = props.rooms.find(room => room.id === foundStorage?.roomId)
                            console.log('product Trouvé :', product)
                            return (
                                <ProductItem
                                    key={product.id}
                                    productProperty={product}
                                    onDeleteProductProperty={props.onDeleteProduct}
                                    storageProperty={foundStorage}
                                    roomProperty={foundRoom}
                                />
                            )
                        }
                        )
                    }
                </li>
            </ul>
        </div>

    )
}