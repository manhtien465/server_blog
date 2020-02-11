import React, { Component } from 'react'
import logo from '../../images/logo.png';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
class Contact extends Component {
  constructor(props){
    super(props)
    this.state={

    }
  }
  render () {
    return (
      <div id="contact">
        <div>Liên hệ</div>
        <img src={logo} alt=""/>
        <div className="contact__another">
        <div className="contact__another--social">
          Bạn có thể ib trực tiếp cho mình thông qua các mạng xã hội như facebook và instagram
          <a href="https://www.facebook.com/tien.nguyenmanh.465">Link facebok</a>
            <a href="https://www.instagram.com/tien_xoay//">Link instagram</a>
        </div>
        </div>
       <div className="contact__box">
         <div classname="contact__box--email">
           hoặc các bạn có thể gửi email về địa chỉ:<strong>nguyenmtien465@gmail.com</strong>
         </div>
       </div>
         </div>
    )
  }
}

export default Contact;
