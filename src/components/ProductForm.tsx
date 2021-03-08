import React, { ChangeEvent, FC, useState } from 'react';
import { Input } from 'theme-ui';
import { Product } from '../api/types';


type ProductFormProps = {
    readonly onSubmitProduct: (newProduct: Product) => void
}

export const ProductForm: FC<ProductFormProps> = (props) => {

    const [nameValue, setNameValue] = useState('')
    const [categoryValue, setCategoryValue] = useState('')



    console.log('state', nameValue, categoryValue)

    function handleChangeName(event: ChangeEvent<HTMLInputElement>) {
        setNameValue(event.target.value);
    }

    function handleChangeCategory(event: ChangeEvent<HTMLInputElement>) {
        setCategoryValue(event.target.value);
    }

    function handleSubmit(event: ChangeEvent<HTMLFormElement>) {
        if (nameValue === '' || categoryValue === '') {
            return
        }
        event.preventDefault();
        console.log('submit')
        const newProduct: Product = {
            id: Math.random().toString(),
            storageId: '',
            name: nameValue,
            category: categoryValue
        }
        props.onSubmitProduct(newProduct)
        setNameValue('');
        setCategoryValue('');
    }


    return (
        <form onSubmit={handleSubmit}>
            <Input onChange={handleChangeName} placeholder='name' type="text" name="name" value={nameValue} id="name" />
            <Input onChange={handleChangeCategory} placeholder='category' type="text" name="category" value={categoryValue} id="category" />
            <Input type="submit" value="Envoyer" />
        </form>
    )
}