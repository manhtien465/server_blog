import React, { Component } from 'react'
import Footer from './components/footer'
import Headers from './components/headers';
import {connect} from 'react-redux';
import {getItems,deleteItems,setItemsLoading} from './actions/itemAction'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

import Routerr from './components/Router';

class App extends Component {
  constructor(props){
    super(props)
    this.state={
     data:null,
    }
  }
  
  render(){
  return (
    <Router>
    <div id="container">
    <Headers></Headers>
    <Routerr></Routerr>
       <Footer></Footer>
     </div>
</Router>
  );
}
}

const mapStateToProps = (state, ownProps) => {
return {
  item: state.items
};
};

export default connect(mapStateToProps,{getItems,deleteItems,setItemsLoading})(App);
