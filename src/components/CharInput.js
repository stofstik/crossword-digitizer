import React, { Component } from 'react';

export class CharInput extends Component {
 constructor(props) {
    super(props);
    this.onKeyUp    = this.onKeyUp.bind(this);
    this.onKeyDown  = this.onKeyDown.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
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

  onKeyUp(e) {
    e.preventDefault()
    this.props.onKeyUp( e, this.props.left, this.props.top );
  }

  onKeyDown(e) {
    e.preventDefault()
  }

  onKeyPress(e) {
    e.preventDefault()
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
        onKeyUp={ this.onKeyUp }
        onKeyDown={ this.onKeyDown }
        onKeyPress={ this.onKeyPress }
        onClick={ this.onClick }
        value={ this.props.char }
        style={ style }
        maxLength="1"
      />
    );
  }
}
