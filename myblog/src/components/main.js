import React, { Component } from 'react'
import logo from '../images/logo.png';
import l from '../images/1.jpg';
import reactjs from'../images/reactjs.png';
import {connect} from 'react-redux';
import {getItems,deleteItems,setItemsLoading} from '../actions/itemAction'
import PropTypes from 'prop-types'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
class Main extends Component {
  constructor(props){
    super(props)
    this.state={
data:[],
    }
  }
  componentWillMount() {
 axios.get("/users").then(
   res=>{
     this.setState({
       data:res.data
     });
   }
 )

    }
    infor =(infor) => {
       const getdata=(getinfor)=>{
      var dispatch=this.props.dispatch                 //cách gọi hàm thực thi trong store
      dispatch({type:"GET_INFOR",
      getinfor})
    }
      getdata(infor);

    }


  render () {
console.log(this.state.data);

   const a= this.state.data.map((index,key)=>{
      var year=index.updatedAt.slice(0,4)
    var  date=index.updatedAt.slice(5,7)
      if(date==="01"){
        date="January"
      }
      else if (date==="02") {
        date="February"
      }
      else if (date==="03") {
        date="March"
      }
      else if (date==="04") {
        date="April"
      }
      else if (date==="05") {
        date="May"
      }
      else if (date==="06") {
        date="June"
      }

      else if (date==="07") {
        date="Jury"}
      else if (date==="08") {
        date="August"
      }
      else if (date==="09") {
        date="September"
      }
      else if (date==="10") {
        date="Octember"
      }
      else if (date==="11") {
        date="November"
      }
      else if (date==="12") {
        date="December"
      }
     var  day=index.updatedAt.slice(8,10)
   var image=index.image.replace("public","")
     return(
         <div  className="main__box">
           <div className="main__box--img">
              <Link to="/detail" onClick={(infor)=>this.infor(index)}>  <img src={image} alt=""/></Link>
           </div>
           <div className="main__box--title">
          <Link to="/detail" onClick={(infor)=>this.infor(index)}>  <h2> {index.title}</h2> </Link>
           </div>
           <div  className="main__box--subheader">
          <p>{index.subtitle}</p>
           </div>
           <div className="main__box--date">
             <span className="main__box--date-month">{date}</span>
           <span className="main__box--date-day">{day}</span>
             <span className="main__box--date-year">{year}</span>
           </div>
         </div>
         )
   })

return(
  <div>
   {a}

  </div>
)
  }
}
Main.propTypes={
  getItems:PropTypes.func.isRequired,
  item:PropTypes.object.isRequired
}
const mapStateToProps = (state, ownProps) => {
return {
  item: state.itemReduce,
  infor:state.infor
};
};




export default connect(mapStateToProps)(Main);
