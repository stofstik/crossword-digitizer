import React, { Component } from 'react';

export class CharInput extends Component {
 constructor(props) {
    super(props);
    this.onKeyUp    = this.onKeyUp.bind(this)
    this.onClick    = this.onClick.bind(this)
    this.onChange   = this.onChange.bind(this)
    this.focus      = this.focus.bind(this)
    this.onFocus    = this.onFocus.bind(this)
  }

  componentDidMount() {
    this.focus()
  }

  componentDidUpdate() {
    if(this.props.hasFocus) {
      this.focus()
    }
  }

  focus() {
    this.textInput.focus()
  }

  onFocus(e) {
    e.target.select()
  }

  /*
   * Need to use both onKeyUp and onKeyPress as we want to catch arrow keys as
   * well as chars.
   * onKeyPress does not trigger for arrow keys and stuff : (
   */
  onKeyUp(e) {
    this.props.onKeyUp( e, this.props.left, this.props.top, this.props.size )
  }

  onChange(e) {
    this.props.onChange( e, this.props.left, this.props.top, this.props.size )
    // e.preventDefault()
  }

  onClick(e) {
    this.props.onClick( e, this.props.left, this.props.top )
  }

  render() {
    const style = {
      width:  this.props.size,
      height: this.props.size,
      top:    this.props.top,
      left:   this.props.left,
      fontSize: `${this.props.size / 2}pt`,
    }
    let className = "char-input"
    if(this.props.highlighted) {
      className += " highlighted"
    }
    return (
      <input
        className={ className }
        type="text"
        ref={ (input) => this.textInput = input }
        onKeyUp={ this.onKeyUp }
        onChange={ this.onChange }
        onClick={ this.onClick }
        onFocus={ this.onFocus }
        value={ this.props.char }
        style={ style }
        maxLength="1"
      />
    );
  }
}
