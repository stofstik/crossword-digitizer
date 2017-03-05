import React, { Component } from 'react';
import _                    from 'underscore'

export const SIZE = 16

const style = {
  padding: 0,
  margin: 0,
  border: 'none',
  // borderWidth: 2,
  background: 'lightgrey',
  width: SIZE,
  height: SIZE,
  position: 'absolute',
  textAlign: 'center',
  textTransform: 'uppercase',
}

export class CharInput extends Component {
  constructor(props) {
    super(props)
    this.keyUp = this.keyUp.bind(this)
  }

  componentDidMount() {
    console.log(this.props)
  }

  keyUp(e) {
    if(e.keyCode !== 8) return;
    this.props.deleteField({ x: this.props.left, y: this.props.top });
  }

  render() {
    style.top  = this.props.top;
    style.left = this.props.left;
    return (
      <input onKeyUp={ this.keyUp } autoFocus maxLength="1" style={ style } />
    );
  }
}
