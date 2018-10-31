import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
	render(){
		return(
			    <div className={ "button " + (this.props.active ? "active" : "") } onClick={this.props.clickHandler}>{this.props.label}</div>
		);
	}
}

export default Button;


//NOTE: Can be also made with function since this component is stateless

// import React from 'react';
// import './Button.css';
//
// function Button(props){
// 		return(
// 			    <div className={ "button " + (props.active ? "active" : "") } onClick={props.clickHandler}>{props.label}</div>
// 		);
// }
// export default Button;
