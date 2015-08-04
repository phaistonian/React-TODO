import React, { Component } from 'react';

export default class Todos extends Component {

  componentDidUpdate () {
    let editing = this.props.todos.filter(todo => todo.editing)[0];
    if (editing) {
      this.refs[`i-${editing.id}`].getDOMNode().select();
      this.refs[`i-${editing.id}`].getDOMNode().focus();
    }
  }

  handleEdit (todo) {
    if (!todo.editing) {
      this.props.edit(todo.id);
    } else {
      this.props.done_editing(todo.id);
    }
  }

  handleKeyDown (todo, event) {
    if (event.keyCode === 13) {
      this.props.update(todo.id, event.target.value);
      this.props.done_editing(todo.id);
    }

    if (event.keyCode === 27) {
      this.props.done_editing(todo.id);
    }
  }

  render () {

    return (
      <ul>
        {this.props.todos.map(todo => {
          let styles = {
            'textDecoration': todo.completed ? 'line-through' : 'none'
          };
          return (
            <li key={`key-${todo.id}`} style={styles}>
              <input
                type="checkbox"
                onChange={this.props[todo.completed ? 'uncomplete' : 'complete'].bind(this, todo.id)}
                checked={todo.completed} />
              &nbsp;
              {todo.editing ?
                <input
                  type="text"
                  ref={`i-${todo.id}`}
                  defaultValue={todo.title}
                  onKeyDown={this.handleKeyDown.bind(this, todo)} />
                : todo.title
              }
              &nbsp;
              <a href="#" onClick={this.handleEdit.bind(this, todo)}>
                {!todo.editing ?
                  'edit' :
                  'done_editing'
                }
              </a>
              &nbsp;
              <a href="#" onClick={this.props.remove.bind(this, todo.id)}>delete</a>
            </li>
          );
        })}
      </ul>
    );
  }
}
