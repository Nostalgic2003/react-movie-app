import './Footer.css';
import React from 'react';

const Footer = (props) => {
    return (
        <footer className="Footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <img src={props.logo} alt={props.title} id="footer-logo" />
                    <p>&copy; Netflix 2024</p>
                </div>
                <p>
                    Welcome to Nekplek, your destination for everything movies online for free!<br />
                    We offer a comprehensive collection of film reviews and news from the cinematic world.<br />
                    Whether you're a casual viewer, our site provides insights of the latest releases.<br />
                </p>
                <div className="footer-links">
                    <a href="/privacy-policy">Privacy Policy</a>
                    <a href="/terms-of-service">Terms of Service</a> 
                    <a href="/contact">Contact Us</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;