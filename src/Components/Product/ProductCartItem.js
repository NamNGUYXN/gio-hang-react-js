import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartContext } from '../Layout/Wrapper';

const ProductCartItem = ({ product }) => {
    const [state, dispatch] = useContext(ShoppingCartContext);
    const products = state.products;
    const index = products.findIndex(p => p.id === product.id);
    return (
        <li className="cart-product-item">
            <Link to={`/detail/${product.id}`} className="thumb-cart-product">
                <img src={product.thumbnail} alt="" />
            </Link>
            <div className="product-info">
                <Link to={`/detail/${product.id}`} className="product-name">{product.title}</Link>
                <p className="product-price">{product.price}</p>
            </div>
            <div className="cart-product-action">
                <div className="num-product">
                    <button type="button" className="descrement-btn" onClick={
                        () => dispatch({
                            type: "DES_NUM_PRODUCT",
                            product: products[index]
                        })
                    }>-</button>
                    <input type="number" value={product.numProduct} readOnly onChange={
                        (e) => dispatch({
                            type: "UPD_NUM_PRODUCT",
                            payload: {
                                numProduct: e.target.value,
                                product: products[index]
                            }
                        })
                    } />
                    <button type="button" className="increment-btn" onClick={
                        () => dispatch({
                            type: "INC_NUM_PRODUCT",
                            payload: {
                                product: products[index],
                                numProduct: 1
                            }
                        })
                    }>+</button>
                </div>
                <button type="button" className="remove-btn" onClick={
                    () => {
                        const confirmed = window.confirm("Bạn có muốn xóa sản phẩm khỏi giỏ hàng không?");
                        if (confirmed) {
                            dispatch({
                                type: "DEL_CART",
                                id: product.id
                            })
                        }
                    }
                }>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </button>
            </div>
        </li>
    );
};

export default ProductCartItem;