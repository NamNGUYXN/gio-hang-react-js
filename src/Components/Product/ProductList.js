import React, { useContext } from 'react';
import ProductItem from './ProductItem';
import { ShoppingCartContext } from '../Layout/Wrapper';

const ProductList = () => {
    const [state] = useContext(ShoppingCartContext);
    let products = state.products;
    return (
        <div className="container">
            <div className="product-list">
            {products.map((item, index) => {
                return (
                    <ProductItem
                        key={index}
                        product={item}
                    ></ProductItem>
                );
            })}
            </div>
        </div>
    );
};

export default ProductList;