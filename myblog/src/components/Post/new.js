import React, { Component } from 'react'
import axios from 'axios'
class New extends Component {
  constructor(props){
    super(props)
    this.state={
       selectedFile:'',
       title:'',
       subtitle:'',
       content:'',

    }
  }
  // Fileupload =()=>{
  //   const[file,setFile]=usestate('')
  //   const[filename,setFilename]=useState('Choose File')
  // }
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
  fileUploadHandle =() => {

  }
onSubmit= async e=>{
   const fd =new FormData()
fd.append("title",this.state.title)
fd.append("subtitle",this.state.subtitle)
fd.append("content",this.state.content)
   fd.append("image",this.state.selectedFile)
// fd1.append("imageData",this.state.selectedFile)
e.preventDefault()
    const res=await axios.post('/users/add',fd)
  console.log(res);

}
  render () {
    console.log(this.state);
    return (
      <div id="new">
        <form className="new-addnew" onSubmit={this.onSubmit} enctype="multipart/form-data" >
          <label for="">title</label>
        <textarea  onChange={(event)=>this.onChange(event)} name="title" rows="2" cols="180"></textarea>
        <label for="">subtitle</label>
        <textarea onChange={(event)=>this.onChange(event)} name="subtitle" rows="2" cols="180"></textarea>
        <label for="">content</label>
          <textarea onChange={(event)=>this.onChange(event)} name="content" rows="8" cols="180"></textarea>

              <input onChange={this.onChange1} type="file" name="image" />
          <button  type="submit" name=""  >send</button>
        </form>
         </div>

    )
  }
}

export default New;
