import React, { Component } from 'react';

export class CharInput extends Component {
 constructor(props) {
    super(props);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.focus      = this.focus.bind(this);
  }

  componentDidMount() {
    if(this.props.hasFocus) {
      console.log('set focus to', this.props.left, this.props.top)
      this.focus();
    }
  }

  focus() {
    this.textInput.focus();
  }

  onKeyPress(e) {
    this.props.onKeyPress( e, this.props.left, this.props.top );
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
        type="text"
        ref={ (input) => this.textInput = input }
        onKeyPress={ this.onKeyPress }
        style={ style }
        maxLength="1"
      />
    );
  }
}
