import React, { Component } from 'react';

export default class Header extends Component {
  constructor (props) {
    super(props);
    this.state = { title: '' };
  }

  handleChange (event) {
    this.setState({title: event.target.value});
  }

  handleSubmit (event) {
    event.preventDefault();

    if (this.state.title.trim().length < 2) {
      console.warn('Too small title');
      event.target.focus();
      return;
    }

    this.props.add(this.state.title);
    this.setState({title: ''});
  }

  render () {
    return (
      <form onSubmit={::this.handleSubmit}>
        <input
          disabled={this.props.todosLeft === 0}
          autoFocus
          placeholder="type here"
          ref="input"
          type="text"
          value={this.state.title}
          onChange={::this.handleChange} />
      </form>
    );
  }
}
