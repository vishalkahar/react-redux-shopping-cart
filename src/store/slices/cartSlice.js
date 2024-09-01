import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit"

const findItemIndex = (state, action) => state.findIndex((cartItem) => cartItem.productId === action.payload.productId)

export const fetchCartItemsData = createAsyncThunk('cart/fetchCartItems', async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/carts/5')
        return response.json()
    } catch (error) {
        throw error
    }
})

const slice = createSlice({
    name: 'cart',
    initialState: {
        loading: false,
        list: [],
        error: ''
    },
    reducers: {
        // fetchCartItems(state) {
        //     state.loading = true
        // },
        // fetchCartItemsError(state, action) {
        //     state.loading = false
        //     state.error = action.payload.error || 'Something went wrong!'
        // },
        // loadCartItems(state, action) {
        //     state.loading = false
        //     state.list = action.payload.products
        // },
        addCartItem(state, action) {
            const existingItemIndex = findItemIndex(state.list, action)
            if (existingItemIndex !== -1) state.list[existingItemIndex].quantity += 1
            else state.list.push({ ...action.payload, quantity: 1 })
        },
        removeCartItem(state, action) {
            const existingItemIndex = findItemIndex(state.list, action)
            state.list.splice(existingItemIndex, 1)
        },
        increaseCartItemQuantity(state, action) {
            const existingItemIndex = findItemIndex(state.list, action)
            state.list[existingItemIndex].quantity += 1
        },
        decreaseCartItemQuantity(state, action) {
            const existingItemIndex = findItemIndex(state.list, action)
            state.list[existingItemIndex].quantity -= 1
            if (state.list[existingItemIndex].quantity === 0)
                state.list.splice(existingItemIndex, 1)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartItemsData.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchCartItemsData.fulfilled, (state, action) => {
                state.loading = false
                state.list = action.payload.products
            })
            .addCase(fetchCartItemsData.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.error || 'Something went wrong!'
            })
    }
})

const getCartItems = ({ products, cartItems }) => {
    return cartItems.list.map(({ productId, quantity }) => {
        const cartProduct = products.list.find(product => product.id === productId)
        return { ...cartProduct, quantity }
    }).filter(({ title }) => title)
}

// const { fetchCartItems, fetchCartItemsError, loadCartItems } = slice.actions
// export const fetchCartItemsData = () => (dispatch) => {
//     dispatch(fetchCartItems())
//     fetch('https://fakestoreapi.com/carts/5')
//         .then(res => res.json())
//         .then(data => {
//             dispatch(loadCartItems(data))
//         }).catch(() => {
//             dispatch(fetchCartItemsError())
//         })
// }
export const getAllCartItems = createSelector(getCartItems, (state) => state)
export const getCartLoadingState = state => state.cartItems.loading
export const getCartError = state => state.cartItems.error

export const {
    addCartItem,
    removeCartItem,
    increaseCartItemQuantity,
    decreaseCartItemQuantity
} = slice.actions

export default slice.reducer