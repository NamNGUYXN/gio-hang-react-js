import React, { useEffect, useReducer, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import NotFound from './NotFound';
import ProductDetail from '../Product/ProductDetail';
import ProductCart from '../Product/ProductCart';
import ProductList from '../Product/ProductList';

const calculatorTotalProductCart = (products) => {
    let t = 0;
    products.forEach((p) => {
        t += p.price * p.numProduct;
    });
    return t;
}

const getProducts = async () => {
    try {
        const response = await axios.get(
            'https://dummyjson.com/products?limit=10&select=title,description,price,stock,thumbnail'
        );

        return response.data
    } catch (error) {
        console.log(error);
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case "GET_PRODUCTS": {
            // Tạo bản sao state
            const stateCopy = JSON.parse(JSON.stringify(state));
            // Thay đổi mảng sp trong bản sao state
            stateCopy.products = action.products;

            // Trả về bản sao state để cập nhật lại state gốc
            return stateCopy;
        }

        case "ADD_CART": {
            // Tạo bản sao state
            const stateCopy = JSON.parse(JSON.stringify(state));
            // Lấy các thuộc tính trong state
            const { cartProducts, totalPrice } = state;
            // Lấy product và numProduct được gửi đến
            const { product, numProduct } = action.payload;

            if (!isNaN(numProduct)) {
                /**
                 * Tìm trong giỏ hàng có sản phẩm với id truyền vào không
                 * Có -> chỉ mục sản phẩm đó trong giỏ hàng
                 * Không -> -1
                */
                const index = cartProducts.findIndex(p => p.id === product.id);

                // Thêm vào giỏ hàng khi không có sản phẩm
                if (index === -1) {
                    // Thêm số lượng cho sản phẩm cần thêm vào giỏ hàng
                    stateCopy.cartProducts.push({ ...product, numProduct: numProduct });

                    // Tính tổng thành tiền của giỏ hàng
                    stateCopy.totalPrice = totalPrice + product.price * numProduct;
                }
                // Khi đã có sản phẩm trong giỏ hàng thì tăng số lượng
                else {
                    // Khi số lượng chọn bằng với số lượng tồn
                    if (cartProducts[index].numProduct < product.stock &&
                        (numProduct + cartProducts[index].numProduct) <= product.stock
                    ) {
                        // Cập nhật số lượng chọn sản phẩm trong giỏ hàng
                        stateCopy.cartProducts[index].numProduct += numProduct;

                        // Tính tổng thành tiền của giỏ hàng
                        stateCopy.totalPrice = calculatorTotalProductCart(stateCopy.cartProducts)
                    }
                }
            }

            // Trả về bản sao state để cập nhật lại state gốc
            return stateCopy;
        }

        case "INC_NUM_PRODUCT": {
            // Tạo bản sao state
            const stateCopy = JSON.parse(JSON.stringify(state));
            // Lấy các thuộc tính trong state
            const { cartProducts } = state;
            // Lấy product và numProduct được gửi đến
            const { product, numProduct } = action.payload;

            /**
             * Tìm trong giỏ hàng có sản phẩm với id truyền vào không
             * Có -> chỉ mục sản phẩm đó trong giỏ hàng
             * Không -> -1
            */
            const index = cartProducts.findIndex(p => p.id === product.id);

            // Khi số lượng chọn bằng với số lượng tồn
            if (cartProducts[index].numProduct < product.stock &&
                (numProduct + cartProducts[index].numProduct) <= product.stock
            ) {
                // Tăng số lượng chọn sản phẩm trong giỏ hàng
                stateCopy.cartProducts[index].numProduct++;

                // Tính tổng thành tiền của giỏ hàng
                stateCopy.totalPrice = calculatorTotalProductCart(stateCopy.cartProducts)
            }

            // Trả về bản sao state để cập nhật lại state gốc
            return stateCopy;
        }

        case "DES_NUM_PRODUCT": {
            // Tạo bản sao state
            const stateCopy = JSON.parse(JSON.stringify(state));
            // Lấy các thuộc tính trong state
            const { cartProducts } = state;
            // Lấy product được gửi đến
            const id = action.product.id;

            /**
             * Tìm trong giỏ hàng có sản phẩm với id truyền vào không
             * Có -> chỉ mục sản phẩm đó trong giỏ hàng
             * Không -> -1
            */
            const index = cartProducts.findIndex(p => p.id === id);

            // Khi số lượng chọn bằng với số lượng tồn
            if (cartProducts[index].numProduct > 1) {
                // Giảm số lượng chọn sản phẩm trong giỏ hàng
                stateCopy.cartProducts[index].numProduct--;

                // Tính tổng thành tiền của giỏ hàng
                stateCopy.totalPrice = calculatorTotalProductCart(stateCopy.cartProducts)
            }

            // Trả về bản sao state để cập nhật lại state gốc
            return stateCopy;
        }

        case "UPD_NUM_PRODUCT": {
            // Tạo bản sao state
            const stateCopy = JSON.parse(JSON.stringify(state));
            // Lấy các thuộc tính trong state
            const { cartProducts } = state;
            // Lấy product và numProduct được gửi đến
            const { product, numProduct } = action.payload;

            /**
             * Tìm trong giỏ hàng có sản phẩm với id truyền vào không
             * Có -> chỉ mục sản phẩm đó trong giỏ hàng
             * Không -> -1
            */
            const index = cartProducts.findIndex(p => p.id === product.id);

            // Số lượng chọn phải từ 1 -> số lượng tồn
            if (numProduct >= 1 && numProduct <= product.stock) {
                stateCopy.cartProducts[index].numProduct = numProduct;
            }

            // Trả về bản sao state để cập nhật lại state gốc
            return stateCopy;
        }

        case "DEL_CART": {
            // Tạo bản sao state
            const stateCopy = JSON.parse(JSON.stringify(state));
            // Lấy các thuộc tính trong state
            const { cartProducts, totalPrice } = state;
            // Lấy id product được gửi đến
            const id = action.id;

            /**
             * Tìm trong giỏ hàng có sản phẩm với id truyền vào không
             * Có -> chỉ mục sản phẩm đó trong giỏ hàng
             * Không -> -1
            */
            const index = cartProducts.findIndex(p => p.id === id);

            // Xóa sản phẩm chỉ định khỏi giỏ hàng
            stateCopy.cartProducts.splice(index, 1);

            // Lưu thành tiền của sản phẩm
            const totalOfPrice = cartProducts[index].price * cartProducts[index].numProduct;

            // Trừ đi thành tiền của sản phẩm vừa xóa
            stateCopy.totalPrice = totalPrice - totalOfPrice;

            // Trả về bản sao state để cập nhật lại state gốc
            return stateCopy;
        }

        case "CHECKOUT": {
            // Tạo bản sao state
            const stateCopy = JSON.parse(JSON.stringify(state));
            stateCopy.cartProducts = [];
            stateCopy.totalPrice = 0;

            // Trả về bản sao state để cập nhật lại state gốc
            return stateCopy;
        }

        default:
            break;
    }
}

export const ShoppingCartContext = createContext();

const ShoppingCartProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, {
        products: [],
        cartProducts: [],
        totalPrice: 0
    });

    // Gọi getProducts lấy API sản phẩm, sau đó gửi đến reducer để cập nhật state.products
    useEffect(() => {
        getProducts().then((data) => {
            dispatch({
                type: "GET_PRODUCTS",
                products: data.products
            });
        });
    }, []);

    const value = [state, dispatch];

    return <ShoppingCartContext.Provider value={value} {...props}></ShoppingCartContext.Provider>
}

const Wrapper = () => {
    return (
        <>
            <Router>
                <ShoppingCartProvider>
                    <Header></Header>
                    <div id="wp-content">
                        <Routes>
                            <Route path="/" element={<ProductList />} />
                            <Route path="/detail/:id" element={<ProductDetail />} />
                            <Route path="/cart" element={<ProductCart />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                    <Footer></Footer>
                </ShoppingCartProvider>
            </Router>
        </>
    );
};

export default Wrapper;