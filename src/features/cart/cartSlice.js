import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = 'https://course-api.com/react-useReducer-cart-project'
export const getCartItems = createAsyncThunk('cart/getcartItems', () => {
    return fetch(url)
    .then((res) => res.json())
    .catch((err) => console.log(err))
})

const initialState = {
    cartItems: [],
    amount: 0,
    total: 0,
    isLoading: true
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = []
            state.amount = 0;
        },
        removeItem: (state, action) => {
            state.cartItems = state.cartItems.filter((item) => item.id !== action.payload )
        },
        increase: (state, action) => {
            const cartItem = state.cartItems.find((item) => item.id === action.payload
            )
            cartItem.amount = cartItem.amount + 1;  
        },
        decrease: (state, action) => {
            const cartItem = state.cartItems.find((item) => item.id === action.payload
            )
            cartItem.amount = cartItem.amount - 1;
        },
        calculateTotals: (state) => {
            let amount =  0;
            let total = 0;
            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.amount * item.price
            });
            state.amount = amount;
            state.total = total;
        }
    },
    extraReducers: {
        [getCartItems.pending]: (state) => {
            state.isLoading = true
        },
        [getCartItems.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload
        },
        [getCartItems.rejected]: (state) => {
            state.isLoading = false
        }
    }
})

export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions
export default cartSlice.reducer