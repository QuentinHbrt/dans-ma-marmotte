import { Product, Room, Storage } from "./types";


const KEY_PRODUCTS = 'key_products';
const KEY_ROOMS = 'key_rooms';
const KEY_STORAGES = 'key_storages';

function storeProducts(products: Product[]) {
    localStorage.setItem(KEY_PRODUCTS, JSON.stringify(products))
}

function restoreProducts() {
    const item = localStorage.getItem(KEY_PRODUCTS)
    return item ? JSON.parse(item) as Product[] : []
}

function storeRooms(rooms: Room[]) {
    localStorage.setItem(KEY_ROOMS, JSON.stringify(rooms))
}

function restoreRooms() {
    const item = localStorage.getItem(KEY_ROOMS)
    return item ? JSON.parse(item) as Room[] : [];
}

function storeStorages(storages: Storage[]) {
    localStorage.setItem(KEY_STORAGES, JSON.stringify(storages))
}

function restoreStorages() {
    const item = localStorage.getItem(KEY_STORAGES)
    return item ? JSON.parse(item) as Storage[] : [];
}

function clear() {
    localStorage.removeItem(KEY_PRODUCTS)
    localStorage.removeItem(KEY_ROOMS)
    localStorage.removeItem(KEY_STORAGES)
}

export const LocalStorage = {
    storeProducts,
    restoreProducts,
    storeRooms,
    restoreRooms,
    storeStorages,
    restoreStorages,
    clear,
}









































