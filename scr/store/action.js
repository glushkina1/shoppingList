import {SAVE_PRODUCT, RESET_PRODUCTS} from './types';

export const saveProduct = (newProduct) => {
    return {
        type:'SAVE_PRODUCT',
        payload: newProduct,
    }
}

export const resetProducts = () => {
    return {
        type:'RESET_PRODUCTS'
    }
}
