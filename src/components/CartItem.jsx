import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { decreaseCartItemQuantity, increaseCartItemQuantity, removeCartItem } from '../store/slices/cartSlice';

const CartItem = ({ productId, title, rating, price, image, quantity }) => {
    const dispatch = useDispatch();
    return (
        <div className="cart-item-container">
            <div className="cart-item">
                <img src={image} alt={title} />
                <div>
                    <h3>{title}</h3>
                    <p>{rating} ★ ★ ★ ★</p>
                </div>
            </div>
            <div className="item-price">${price}</div>
            <div className="item-quantity">
                <button onClick={() => dispatch(decreaseCartItemQuantity({ productId }))}>
                    -
                </button>
                <span>{quantity}</span>
                <button onClick={() => dispatch(increaseCartItemQuantity({ productId }))}>
                    +
                </button>
                <button onClick={() => dispatch(removeCartItem({ productId }))}>Remove</button>
            </div>
            <div className="item-total">${quantity * price}</div>
        </div>
    )
}

CartItem.propTypes = {
    productId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
}

export default CartItem