import React, { Component } from 'react';
import Todo from './Todo';

export default class Todos extends Component {

  render () {
    return (
      <ul>
        {this.props.todos.map(todo =>
          <Todo todo={todo} {...this.props} />
        )}
      </ul>
    );
  }
}
