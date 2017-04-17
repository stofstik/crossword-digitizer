import React, { Component } from 'react';

export class CharInput extends Component {
 constructor(props) {
    super(props);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onKeyUp    = this.onKeyUp.bind(this);
    this.onClick    = this.onClick.bind(this);
    this.focus      = this.focus.bind(this);
  }

  componentDidMount() {
    this.focus();
  }

  componentDidUpdate() {
    if(this.props.hasFocus) {
      this.focus();
    }
  }

  focus() {
    this.textInput.focus();
  }

  onKeyPress(e) {
    this.props.onKeyPress( e, this.props.left, this.props.top );
  }

  onKeyUp(e) {
    this.props.onKeyPress( e, this.props.left, this.props.top );
  }

  onClick(e) {
    this.props.onClick( e, this.props.left, this.props.top );
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
        // onKeyPress={ this.onKeyPress }
        onKeyUp={ this.onKeyPress }
        onClick={ this.onClick }
        style={ style }
        maxLength="1"
        maxlength="1"
      />
    );
  }
}
