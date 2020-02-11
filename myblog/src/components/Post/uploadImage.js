import React, { Component } from 'react'

class uploadImage extends Component {
  constructor(props){
    super(props)
    this.state={

    }
  }
 onChange1 = (event) => {
console.log(event.target.files[0]);
    this.setState({
      selectedFile:event.target.files[0]
    });
  }
  render () {
    return (
      <div id="uploadimage">
      <form class="">
            <input onChange={this.onChange1} type="file" name="image" />
      </form>

         </div>
    )
  }
}

export default uploadImage;
