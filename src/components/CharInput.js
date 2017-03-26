import React, { Component } from 'react';

export class CharInput extends Component {
 constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp   = this.onKeyUp.bind(this);
  }

  onKeyDown(e) {
  }

  onKeyUp(e) {
    this.props.onKeyUp(e, this.props.left, this.props.top, this.props.size);
  }

  render() {
    const style = {
      width:  this.props.size,
      height: this.props.size,
      top:    this.props.top,
      left:   this.props.left,
    }
    return (
      <input 
        className="char-input" 
        onKeyUp={ this.onKeyUp } 
        onKeyDown={ this.onKeyDown } 
        style={ style }
        maxLength="1" 
        autoFocus 
      />
    );
  }
}
