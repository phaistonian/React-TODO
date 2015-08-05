import React, { Component } from 'react';

export default class Todo extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isEditing: false
    };
  }

  componentDidUpdate () {
    let editing = this.props.todos.filter(todo => todo.editing)[0];
    if (editing) {
      this.refs[`i-${editing.id}`].getDOMNode().select();
      this.refs[`i-${editing.id}`].getDOMNode().focus();
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
      console.log(this.props);
    return (
      <li key={`key-${todo.id}`} style={styles}>
        <input
          type="checkbox"
          onChange={this.props[todo.completed ? 'uncomplete' : 'complete'].bind(this, todo.id)}
          checked={todo.completed} />
        &nbsp;
        {this.state.isEditing ?
          <input
            type="text"
            ref={`i-${todo.id}`}
            defaultValue={todo.title}
            onKeyDown={this.handleKeyDown.bind(this, todo)} />
          : todo.title
        }
        &nbsp;
        <a href="#" onClick={::this.handleEdit}>
          {!this.state.isEditing ?
            'edit' :
            'done_editing'
          }
        </a>
        &nbsp;
        <a href="#" onClick={this.props.remove.bind(this, todo.id)}>delete</a>
      </li>
    );
  }
}

