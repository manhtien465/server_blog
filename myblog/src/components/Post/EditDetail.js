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
class EditDetail extends Component {
  constructor(props){
    super(props)
    this.state={
      selectedFile:'',
      title:'',
      subtitle:'',
      content:'',
    }
  }

 onChange1 = (event) => {
let files=event.target.files[0];
this.setState({
 selectedFile:files
});


 }

 onChange = (event) => {

   const value=event.target.value
   const name=event.target.name
   this.setState({
     [name]:value
   });
}
onSubmit1= async e=>{
   const fd =new FormData()
   fd.append("id",this.props.infor1._id)
fd.append("title",this.state.title)
fd.append("subtitle",this.state.subtitle)
fd.append("content",this.state.content)
   fd.append("image",this.state.selectedFile)
// fd1.append("imageData",this.state.selectedFile)
e.preventDefault()
    const res=await axios.post('/users/edit',fd)
  console.log(res);

}
  render () {
    console.log(this.props.infor1._id);

    return (
      <div id="edit">
      <form className="new-addnew" onSubmit={this.onSubmit1} encType="multipart/form-data" >
        <label for="">title</label>
      <textarea  onChange={(event)=>this.onChange(event)} name="title" rows="2" cols="160" defaultValue={this.props.infor1.title}></textarea>
      <label for="">subtitle</label>
      <textarea onChange={(event)=>this.onChange(event)} name="subtitle" rows="2" cols="160"  defaultValue={this.props.infor1.subtitle}></textarea>
      <label for="">content</label>
        <textarea onChange={(event)=>this.onChange(event)} name="content" rows="8" cols="160"  defaultValue={this.props.infor1.content}></textarea>

            <input onChange={this.onChange1} type="file" name="image" />
        <button onClick={this.onSubmit} type="submit" name=""  >send</button>
      </form>
         </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
return {

  infor1:state.infor1
};
};




export default connect(mapStateToProps)(EditDetail);
