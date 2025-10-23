import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

const cartSlice = createSlice({
    name: "item",
    initialState: {
        items: []
    },
    reducers: {
        // addItem, removeItem & clearItem are reducer functions
        addItem: (state, action) =>{
            // mutating the state here (directly modifying our state here)
            // uses immer behind the scenes
            state.items.push(action.payload);
        },
        removeItem: (state) =>{
            state.items.pop();
        },
        clearCart: (state) =>{
            state.items.length = 0;
        }
    }
})

export const {addItem, removeItem, clearCart} = cartSlice.actions;

export default cartSlice.reducer