import React, { Component } from 'react';

export class Button extends Component {
 constructor(props) {
    super(props)
  }

	onClick(e) {

		console.log(e)
	}

  render() {
		const size      = this.props.size || 48
		const className = `material-icons md-${ size }`
		return (
			<div onClick={ this.props.onClick }>
				<i className={ className }>{ this.props.icon }</i>
			</div>
		)
  }

}
