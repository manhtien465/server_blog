import React, { Component } from 'react'


class Footer extends Component {
  render () {
return (
  <div className="footer">
   <div className="footer__social">
     <a href="https://www.facebook.com/tien.nguyenmanh.465"><i className="fab fa-instagram" /></a>
     <a href="https://www.instagram.com/tien_xoay//"><i className="fab fa-facebook-f" /></a>
   </div>
    <div className="footer__copyright">
        2020 © Xoay .
    </div>
  </div>
);
  }
}

export default  Footer;
