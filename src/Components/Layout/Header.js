import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartContext } from './Wrapper';

const Header = () => {
    const [state] = useContext(ShoppingCartContext);
    return (
        <header>
            <div className="container">
                <Link to="/" className="logo"><span>PNam</span>Store</Link>
                <nav>
                    <ul>
                        <li className="nav-item">
                            <Link to="/">Trang chủ</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/">Sản phẩm</Link>
                        </li>
                    </ul>
                </nav>
                <Link to="/cart" className="cart-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    <span className="num-cart">{state.cartProducts.length}</span>
                </Link>
            </div>
        </header>
    );
};

export default Header;