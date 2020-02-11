import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
class Post extends Component {
  constructor(props){
    super(props)
    this.state={

    }
  }
  render () {
    return (
      <div id="post">
         <Link to="/admin/login/addnew" >
          <div class="">
            tạo bài viết mới
          </div>

         </Link>
         <Link to="/admin/login/edit" >

              <div class="">
  edit
               </div>
         </Link>

         </div>
    )
  }
}

export default Post;
