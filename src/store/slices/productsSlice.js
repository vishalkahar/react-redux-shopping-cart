
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchProductsData = createAsyncThunk('product/fetchProductItems', async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products')
        return response.json()
    } catch (error) {
        throw error
    }
})

const slice = createSlice({
    name: 'product',
    initialState: {
        loading: false,
        list: [],
        error: ''
    },
    reducers: {
        // fetchProducts(state) {
        //     state.loading = true
        // },
        // fetchProductsError(state, action) {
        //     state.loading = false
        //     state.error = action.payload || 'Something went wrong!'
        // },
        // updateAllProducts(state, action) {
        //     state.loading = false
        //     state.list = action.payload
        //     state.error = ''
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsData.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchProductsData.fulfilled, (state, action) => {
                state.loading = false
                state.list = action.payload
                state.error = ''
            })
            .addCase(fetchProductsData.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload || 'Something went wrong!'
            })
    }
})
export const getAllProducts = state => state.products.list
export const getProductLoadingState = state => state.products.loading
export const getProductError = state => state.products.error

// export const { updateAllProducts, fetchProducts, fetchProductsError } = slice.actions

// export const fetchProductsData = () => (dispatch) => {
//     dispatch(fetchProducts())
//     fetch('https://fakestoreapi.com/products')
//         .then(res => res.json())
//         .then(data => {
//             dispatch(updateAllProducts(data))
//         }).catch(() => {
//             dispatch(fetchProductsError())
//         })
// }

export default slice.reducer