import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartContext } from '../Layout/Wrapper';

const ProductItem = ({ product }) => {
    const [,dispatch] = useContext(ShoppingCartContext);
    return (
        <div className="product-item">
            <div className="item">
                <Link to={`/detail/${product.id}`} className="product-thumb">
                    <img src={product.thumbnail} alt="" />
                </Link>
                <Link to={`/detail/${product.id}`} className="product-name">{product.title}</Link>
                <p className="product-price">{product.price}</p>
                <p className="product-desc">{product.description}</p>
                <div className="action">
                    <Link to="/cart" className="add-cart-btn" onClick={
                        () => dispatch({
                            type: "ADD_CART",
                            payload: {
                                product,
                                numProduct: 1
                            }
                        })
                    }>Thêm vào giỏ</Link>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;