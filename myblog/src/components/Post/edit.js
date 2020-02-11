import React, { Component } from 'react'
import {connect} from 'react-redux';
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
class Edit extends Component {
  constructor(props){
    super(props)
    this.state={
data:[],
detailData:"",
    }
  }
  componentWillMount() {
 axios.get("/users").then(
   res=>{
     this.setState({
       data:res.data
     });
   }
 )}
 infor =(infor) => {
    const getdata=(getinfor1)=>{
   var dispatch=this.props.dispatch                 //cách gọi hàm thực thi trong store
   dispatch({type:"GET_INFOR1",
   getinfor1})
 }
   getdata(infor);

 }
 delete= async(value) => {
   console.log(value);
   var id=value._id
axios.delete(`/users/delete/${id}`)
.then(
  res=>{
    console.log(res);
  }
)
 }
  render () {
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
      return(
        <div className="edit__wrapper">
        <Link className="edit__wrapper--box" to="/admin/login/EditDetail" onClick={(infor)=>this.infor(index)}>
        <div className="edit__list">

      <div class="edit__list--title">
      {index.title}
      </div>
      <div className="edit__list--content">
        {index.content}
      </div>
      <div className="edit__list--date">
      {day}/{date}/{year}

      </div>

    </div>

    </Link>
    <a className="edit__delete" href="" onClick={(value)=>this.delete(index)}><i class="fas fa-trash"></i></a>
    </div>
      )
    })
    return (
      <div id="edit">
      {a}
         </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
return {

  infor1:state.infor1
};
};




export default connect(mapStateToProps)(Edit);
