import React, { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCartContext } from '../Layout/Wrapper';

const ProductDetail = () => {
    const { id } = useParams();
    const [state, dispatch] = useContext(ShoppingCartContext);
    const product = state.products.find(p => p.id === Number(id));
    const [numProSelected, setNumProSelected] = useState(1);

    return (
        <>
            <div className="container">
                <div className="product-detail">
                    <button type="button" className="product-img-btn">
                        <img src={product.thumbnail} alt="" />
                    </button>
                    <div className="product-info">
                        <p className="product-name">{product.title}</p>
                        <p className="quantity">Số lượng tồn: <span>{product.stock}</span></p>
                        <p className="product-price">{product.price}</p>
                        <div className="product-action">
                            <div className="num-product">
                                <button type="button" className="descrement-btn" onClick={
                                    () => {
                                        if (numProSelected > 1) {
                                            setNumProSelected(numProSelected - 1);
                                        }
                                    }
                                }>-</button>
                                <input type="number" id="num-product-selected" value={numProSelected}
                                    onChange={
                                        (e) => {
                                            if (e.target.value <= product.stock) {
                                                setNumProSelected(e.target.value);
                                            }
                                        }
                                    }
                                />
                                <button type="button" className="increment-btn" onClick={
                                    () => {
                                        if (numProSelected < product.stock) {
                                            setNumProSelected(numProSelected + 1);
                                        }
                                    }
                                }>+</button>
                            </div>
                            <Link to="/cart" className="add-cart-btn" onClick={
                                () => {
                                    const inputNumProduct = document.querySelector("#num-product-selected");
                                    const numProductSelected = parseInt(inputNumProduct.value);
                                    dispatch({
                                        type: "ADD_CART",
                                        payload: {
                                            product,
                                            numProduct: numProductSelected
                                        }
                                    });
                                }
                            }>Thêm vào giỏ</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <article className="box-product-desc">
                    <h3>Mô tả</h3>
                    <p className="product-desc">{product.description}</p>
                </article>
            </div>
        </>
    );
};

export default ProductDetail;