import { useSelector } from 'react-redux'
import Product from '../components/product'
import { getAllProducts, getProductError, getProductLoadingState } from '../store/slices/productsSlice'

const Home = () => {
    const productList = useSelector(getAllProducts)
    const isLoading = useSelector(getProductLoadingState)
    const error = useSelector(getProductError)

    return (
        isLoading ? (
            <h1 style={{ textAlign: 'center' }}>Loading...</h1>
        ) : error ? <h2 style={{ textAlign: 'center' }}>{error}</h2> : (
            <div className='products-container'>
                {productList.map(({ id, title, rating, price, image }) =>
                    <Product
                        key={id}
                        productId={id}
                        title={title}
                        rating={rating}
                        price={price}
                        imageUrl={image}
                    />
                )}
            </div>
        )
    )
}

export default Home