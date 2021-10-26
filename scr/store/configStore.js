import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import productReducer from './reducer'


const persistConfig = {
    key: 'product',
    storage,
}
const persistedReducer = persistReducer(persistConfig, productReducer)

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)


