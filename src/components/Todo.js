import React, { Component } from 'react';

export default class Todo extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isEditing: false
    };
  }

  componentDidUpdate () {
    if (this.state.isEditing) {
      this.refs.edit.getDOMNode().select();
    }
  }

  handleEdit () {
    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  handleKeyDown (todo, event) {
    if (event.keyCode === 13) {
      this.props.update(todo.id, event.target.value);
      this.handleEdit();
    }

    if (event.keyCode === 27) {
      this.handleEdit();
    }
  }

  render () {
    const { todo } = this.props;
    let styles = {
      textDecoration: todo.completed ? 'line-through' : 'none'
    };

    return (
      <li key={`key-${todo.id}`} style={styles}>
        <input
          type="checkbox"
          onChange={this.props[todo.completed ? 'uncomplete' : 'complete'].bind(this, todo.id)}
          checked={todo.completed} />
        &nbsp;
        {this.state.isEditing ?
          <input
            ref="edit"
            type="text"
            defaultValue={todo.title}
            onKeyDown={this.handleKeyDown.bind(this, todo)} />
          : todo.title
        }
        &nbsp;
        <a href="#" onClick={::this.handleEdit}>
          {!this.state.isEditing ?
            'Edit' :
            'Done'
          }
        </a>
        &nbsp;
        <a href="#" onClick={this.props.remove.bind(this, todo.id)}>Delete</a>
      </li>
    );
  }
}

