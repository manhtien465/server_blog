import React, { Component } from 'react'
import {connect} from 'react-redux';
class MainDetail extends Component {
  constructor(props){
    super(props)
    this.state={

    }
  }
  render () {
    return (
       <div className="MainDetail">

      <div className="MainDetail__title">
      <h2>{this.props.infor.title}</h2>
      </div>
     <div className="MainDetail__content">
       {this.props.infor.content}
     </div>

        </div>

    )
  }
}

const mapStateToProps = (state, ownProps) => {
return {
  infor: state.infor
};
};

export default connect(mapStateToProps)( MainDetail);
