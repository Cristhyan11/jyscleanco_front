import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <div className="bottom">
      <div className="social">
        <ul>
          <li><a href="https://facebook.com" title="Facebook"><i className="fa fa-facebook-official" aria-hidden="true"></i></a></li>
          <li><a href="https://twitter.com" title="Twitter"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
          <li><a href="https://instagram.com" title="Instagram"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
        </ul>
      </div>
      <a href="javascript:void(0);" title="Newsletter"><p>¿Conoces nuestra newsletter?</p></a>
    </div>
  );
};

export default Footer;
