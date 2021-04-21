
import React, { FC } from 'react';
import { Product, Room, Storage } from '../api/types';
import { ProductItem } from './ProductItem';

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

    return (
        <ul className="d-flex justify-content-center">
            <li>
                {
                    arrayOfProducts.map((product) => {
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
    )
}