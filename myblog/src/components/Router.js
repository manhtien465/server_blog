import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import Blog from './header/blog'
import Contact from './header/Contact'
import AboutMe from './header/AboutMe'
import Main from './main'
import Post from './Post'
import MainDetail from './MainDetail'
import Login from './login'
import New from './Post/new'
import Edit from './Post/edit'
import uploadImage from './Post/uploadImage'
import EditDetail from './Post/EditDetail'

export default class Routerr extends Component {
    render() {

        return (

            <div id="main">
                 <Route exact path="/" component={Main}>

          </Route>
          <Route exact path="/blog" component={Blog}>

   </Route>
   <Route exact path="/Contact" component={Contact}>

</Route>
<Route exact path="/About-me" component={AboutMe}>

</Route>
<Route exact path="/admin" component={Login}>

</Route>
<Route exact path="/admin/edit" component={Post}>

</Route>
<Route exact path="/admin/login/edit" component={Edit}>

</Route>
<Route exact path="/admin/login/EditDetail" component={EditDetail}>

</Route>
<Route exact path="/admin/login/addnew" component={New}>

</Route>
<Route exact path="/admin/login/uploadImage" component={uploadImage}>

</Route>
<Route exact path="/detail" component={MainDetail}>

</Route>


               </div>

        )
    }
}
