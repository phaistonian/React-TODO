import React, { Component } from 'react';

export default class Footer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      doHide: false
    };
  }

  handleHideCompleted () {
    this.setState({
      doHide: !this.state.doHide
    });

    this.props.hideCompleted(!this.state.doHide);
  }

  render () {
    return (
      <button onClick={::this.handleHideCompleted}>
        {!this.state.doHide ?
          'Hide completed'
          : 'Show all'
        }
      </button>
    );
  }
}
