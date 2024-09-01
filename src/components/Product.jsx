import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { addCartItem } from '../store/slices/cartSlice'

export default function Product({ productId, title, rating, price, imageUrl }) {
    const dispatch = useDispatch()
    return (
        <div className="product">
            <div className="product-image">
                <img src={imageUrl} alt={title} />
            </div>
            <div className="title-container">
                <h3>
                    <a href="#">{title}</a>
                </h3>
            </div>
            <div className="price-rating-container">
                <p className="rating">{+rating?.rate} ★ ★ ★ ★</p>
                <p className="price">{price}</p>
            </div>
            <div className="cta-container">
                <button onClick={() => dispatch(addCartItem({ productId }))}>Add to Cart</button>
                <button>Add to WishList</button>
            </div>
        </div>
    )
}
Product.propTypes = {
    productId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    rating: PropTypes.shape({
        rate: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired
    }),
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired
}