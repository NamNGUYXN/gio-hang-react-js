import React, { useContext } from 'react';
import ProductCartItem from './ProductCartItem';
import ProductCartTotalPrice from './ProductCartTotalPrice';
import { ShoppingCartContext } from '../Layout/Wrapper';

const ProductCart = () => {
    const [state, dispatch] = useContext(ShoppingCartContext);
    const cartProducts = state.cartProducts;
    if (cartProducts.length === 0) {
        return (
            <div className="container-cart no-product">
                <p>Không có sản phẩm nào trong giỏ hàng</p>
            </div>
        );
    }
    return (
        <div className="container-cart">
            <div className="__cart-box-left">
                <div className="box-cart">
                    <ul className="cart-product-list">
                        {cartProducts.map((item, index) => (
                            <ProductCartItem
                                key={index}
                                product={item}
                            ></ProductCartItem>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="__cart-box-right">
                <div className="box-cart-total-amount">
                    <ul className="total-price">
                        {cartProducts.map((item, index) => (
                            <ProductCartTotalPrice
                                key={index}
                                product={item}
                            ></ProductCartTotalPrice>
                        ))}
                    </ul>
                    <p className="total-amount">
                        <span className="title">Tổng tiền:</span>
                        <span className="content">{state.totalPrice}</span>
                    </p>
                </div>
                <button type="button" className="checkout-btn" onClick={
                    () => {
                        const confirmed = window.confirm("Bạn có muốn thanh toán không?");
                        if (confirmed) {
                            alert("Bạn đã thanh toán thành công");
                            dispatch({
                                type: "CHECKOUT"
                            })
                        }
                    }
                }>Thanh toán</button>
            </div>
        </div>
    );
};

export default ProductCart;