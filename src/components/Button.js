import React, { Component } from 'react';

export class Button extends Component {
 constructor(props) {
    super(props)
  }

  render() {
    let buttonStyle = {
      cursor: 'pointer',
      height: "48px",
      width:  "48px",
      background: "lightblue",
    }
    let iconStyle   = {
      color: "#fff",
      width: "50%",
      display: "block",
      padding: "8px",
      fontSize: "24pt",
    }
    buttonStyle      = Object.assign({}, buttonStyle, this.props.buttonStyle)
    iconStyle        = Object.assign({}, iconStyle,  this.props.iconStyle)

		return (
			<div style={ buttonStyle } onClick={ this.props.onClick }>
				<i style={ iconStyle } className="material-icons md-48">{ this.props.icon }</i>
			</div>
		)
  }

}
