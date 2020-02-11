import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
class Login extends Component {
  constructor(props){
    super(props)
    this.state={

    }
  }
  ip =(event) => {
  console.log(event.target.value);
     const value=event.target.value
     const name=event.target.name
     this.setState({
       [name]:value
     });

    }
  login = (event) => {
    if(this.state.username!=="manhtien465" && this.state.passwork!=="tien1234"){
   alert("username or passwork not correct")
      event.preventDefault();
    }


  }
  render () {
    return (
      <div id="login">
        <form >
          <label for="">username</label>
          <input onChange={(event)=>this.ip(event)} type="text" name="username"/>
          <label for="">passwork</label>
          <input onChange={(event)=>this.ip(event)} type="text" name="passwork"/>
          <Link to="/admin/edit" onClick={(event)=>this.login(event)}>submit</Link>
        </form>
         </div>
    )
  }
}

export default Login;
