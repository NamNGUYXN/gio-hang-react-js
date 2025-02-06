import React from 'react';

const ProductCartTotalPrice = ({ product }) => {
    return (
        <li>
            <h3>{product.title} <span>(x{product.numProduct})</span></h3>
            <p className="total-price item">
                <span className="title">Thành tiền:</span>
                <span className="content">{product.price * product.numProduct}</span>
            </p>
        </li>
    );
};

export default ProductCartTotalPrice;