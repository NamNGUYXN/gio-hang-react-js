import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="__footer-box">
                    <div className="__footer-title">
                        <h3>Logo</h3>
                    </div>
                    <div className="__footer-content">
                        <Link to="/" className="logo"><span>PNam</span>Store</Link>
                    </div>
                </div>
                <div className="__footer-box">
                    <div className="__footer-title">
                        <h3>Thông tin liên hệ</h3>
                    </div>
                    <div className="__footer-content">
                        <ul className="contact-information">
                            <li>
                                <span>Địa chỉ:</span> 12/345, Xô Viết Nghệ Tĩnh, Phường 21, Quận Bình Thạnh, Tp Hồ Chí Minh
                            </li>
                            <li>
                                <span>Điện thoại:</span> 0123456789 (Mr.Nam)
                            </li>
                            <li>
                                <span>Email:</span> pnamstore@gmail.com
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="__footer-box">
                    <div className="__footer-title">
                        <h3>Về PNamStore</h3>
                    </div>
                    <div className="__footer-content">
                        <ul className="about-store">
                            <li>
                                <Link to="/">Giới thiệu</Link>
                            </li>
                            <li>
                                <Link to="">Liên hệ</Link>
                            </li>
                            <li>
                                <Link to="">Phương thức thanh toán</Link>
                            </li>
                            <li>
                                <Link to="">Chính sách giao hành</Link>
                            </li>
                            <li>
                                <Link to="">Hướng dẫn đặt hàng</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="__footer-copyright">
                <p>Copyright © 2024 <Link to="/"> PNamStore.vn</Link>
                </p>
            </div>
        </footer>
    );
};

export default Footer;