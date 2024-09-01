
import { Link } from 'react-router-dom'
import CartIcon from '/assets/cart-icon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchProductsData, } from '../store/slices/productsSlice'
import { fetchCartItemsData } from '../store/slices/cartSlice'
// import { fetchData } from '../store/middleware/api'
// import { productsList } from '../store/productsList'

const Header = () => {
    const cartItems = useSelector(state => state.cartItems.list)

    const dispatch = useDispatch()
    useEffect(() => {
        // dispatch(
        //     fetchData({
        //         url: 'products',
        //         onSuccess: updateAllProducts.type,
        //         onStart: fetchProducts.type,
        //         onError: fetchProductsError.type
        //     }))
        dispatch(fetchProductsData())
        dispatch(fetchCartItemsData())
        // dispatch(
        //     fetchData({
        //         url: 'carts/5',
        //         onSuccess: loadCartItems.type,
        //         onStart: fetchCartItems.type,
        //         onError: fetchCartItemsError.type
        //     }))
    }, [])
    return (
        <header>
            <div className="header-contents">
                <h1>
                    <Link to="/">Shopee</Link>
                </h1>
                <Link className="cart-icon" to="/cart">
                    <img src={CartIcon} alt="cart-icon" />
                    <div className="cart-items-count">
                        {cartItems.reduce(
                            (accumulator, currentItem) => accumulator + currentItem.quantity,
                            0
                        )}
                    </div>
                </Link>
            </div>
        </header>
    )
}

export default Header