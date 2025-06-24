import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from './product';

//state interface
interface ProductState {
    products: Product[];
    totalItems: number;
}

const initialState: ProductState = {
    products: [],
    totalItems: 0,
};

// Slice
const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<Product[]>) {
            state.products = action.payload;
            state.totalItems = action.payload.reduce((total, product) => total + product.amount, 0);
        },
        increaseQuantity(state, action: PayloadAction<number>) {
            const product = state.products.find(p => p.id === action.payload);
            if (product) {
                product.amount += 1;
                state.totalItems += 1;
            }
        },
        decreaseQuantity(state, action: PayloadAction<number>) {
            const product = state.products.find(p => p.id === action.payload);
            if (product && product.amount > 0) {
                product.amount -= 1;
                state.totalItems -= 1;
            }
            if (product?.amount === 0) {
                state.products = state.products.filter(p => p.id !== action.payload);
            }
        },
        resetCart(state) {
            state.products = [];
            state.totalItems = 0;
        }
    },
});

export const {
    setProducts,
    increaseQuantity,
    decreaseQuantity,
    resetCart
} = productSlice.actions;

export default productSlice.reducer;
