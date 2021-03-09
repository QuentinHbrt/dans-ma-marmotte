import React, { ChangeEvent, FC, useState } from 'react';
import { Input, Select } from 'theme-ui';
import { Product, Storage } from '../api/types';


type ProductFormProps = {
    readonly onSubmitProduct: (newProduct: Product) => void
    readonly storagesProperty: Storage[]
}

export const ProductForm: FC<ProductFormProps> = (properties) => {

    const [nameValue, setNameValue] = useState('')
    const [categoryValue, setCategoryValue] = useState('')
    const [selectedStorageId, setSelectedStorageId] = useState('')



    console.log('state', nameValue, categoryValue)

    function handleChangeName(event: ChangeEvent<HTMLInputElement>) {
        setNameValue(event.target.value);
    }

    function handleChangeCategory(event: ChangeEvent<HTMLInputElement>) {
        setCategoryValue(event.target.value);
    }

    function handleChangeStorage(event: ChangeEvent<HTMLSelectElement>) {
        setSelectedStorageId(event.target.value)
    }

    function handleSubmit(event: ChangeEvent<HTMLFormElement>) {
        if (nameValue === '' || categoryValue === '' || selectedStorageId === '') {
            return
        }
        event.preventDefault();
        console.log('submit')
        const newProduct: Product = {
            id: Math.random().toString(),
            storageId: selectedStorageId,
            name: nameValue,
            category: categoryValue
        }
        properties.onSubmitProduct(newProduct)
        setNameValue('');
        setCategoryValue('');
        setSelectedStorageId('')
    }


    return (
        <form onSubmit={handleSubmit}>
            <label>PRODUCT :</label>
            <Input onChange={handleChangeName} placeholder='name' type="text" name="name" value={nameValue} id="name" />
            <Input onChange={handleChangeCategory} placeholder='category' type="text" name="category" value={categoryValue} id="category" />
            <Select onChange={handleChangeStorage} value={selectedStorageId}>
                <option value={''} >{'CHOISIR ...'}</option>
                {properties.storagesProperty.map((storage) => <option key={storage.id} value={storage.id}>{storage.name}</option>)}
            </Select>
            <Input type="submit" value="Envoyer" />
        </form>
    )
}