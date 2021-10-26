
const initialState = {
    products: [],
}
const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SAVE_PRODUCT":
            let isRepeated = false;
            let updatedProductList = state.products.map(function(el) {
                if (el.name === action.payload.name) {
                    isRepeated = true;
                    el.arrayForAveragePrice = [...el.arrayForAveragePrice,...Array(parseInt(action.payload.amount)).fill(parseInt(action.payload.price))]
                    el.amount = (parseInt(action.payload.amount) + parseInt(el.amount)).toString()
                }
                return el;
            })
            if (isRepeated) {
                return {
                    products: updatedProductList
                }
            } else {
                return {
                    products: [...state.products, {
                        name: action.payload.name,
                        price: action.payload.price,
                        amount: action.payload.amount,
                        arrayForAveragePrice: Array(parseInt(action.payload.amount)).fill(parseInt(action.payload.price)),
                        currency: action.payload.currency
                    }
                    ]
                }
            }

        case "RESET_PRODUCTS":
            return initialState;
        default:
            return state;
    }
}


export default productReducer;
