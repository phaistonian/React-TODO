import React, { Component } from 'react';
import { createStore, bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';

// Reducer
const initialState = [{
  id: 0,
  title: 'First todo',
  completed: false
}];
const MAX_TODOS = 5;

let counter = 0;
function todos (state = initialState, action) {
  const { id, title, type } = action;
  switch (type) {
    case 'ADD':
      return [...state, { title, id: ++counter}];

    case 'REMOVE':
      return state.filter(todo => todo.id !== id);

    case 'COMPLETE':
      return state.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed: true };
        }
        return todo;
      });

      case 'EDIT':
        return state.map(todo => {
          if (todo.id === id) {
            return { ...todo, editing: true };
          }
          return todo;
        });

    case 'DONE_EDITING':
      return state.map(todo => {
        if (todo.id === id) {
          return { ...todo, editing: false };
        }
        return todo;
      });

    case 'UPDATE':
      return state.map(todo => {
        if (todo.id === id) {
          return { ...todo, title };
        }
        return todo;
      });

    case 'UNCOMPLETE':
      return state.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed: false };
        }
        return todo;
      });

    default:
      return state;
  }
}

// Action creators
function add (title) {
  return {
    type: 'ADD',
    title
  };
}

function remove (id) {
  return {
    type: 'REMOVE',
    id
  };
}

function complete (id) {
  return {
    type: 'COMPLETE',
    id
  };
}

function uncomplete (id) {
  return {
    type: 'UNCOMPLETE',
    id
  };
}

function edit (id) {
  return {
    type: 'EDIT',
    id
  };
}

function done_editing (id) {
  return {
    type: 'DONE_EDITING',
    id
  };
}

function update (id, title) {
  return {
    type: 'UPDATE',
    id,
    title
  };
}









// App
const store = createStore(todos);


class Root extends Component {
  render () {
    return (
      <Provider store={store}>
        { () => <App />}
      </Provider>
    );
  }
}

@connect(state => ({ todos: state }))
class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      hideCompleted: false
    };
  }

  hideCompleted (hideCompleted) {
    this.setState({
      hideCompleted: hideCompleted
    });
  }

  render () {
    const { todos, dispatch } = this.props;
    const actions = bindActionCreators({ add, remove, complete, uncomplete, edit, done_editing, update }, dispatch);

    let filteredTodos;
    if (this.state.hideCompleted) {
      filteredTodos = todos.filter(todo => !todo.completed);
    } else {
      filteredTodos = todos;
    }
    return (
      <div>
        <Header add={actions.add} todosLeft={MAX_TODOS - todos.length} />
        <Todos todos={filteredTodos} {...actions} />
        <Footer hideCompleted={::this.hideCompleted} />
      </div>
    );
  }
}


class Header extends Component {
  constructor (props) {
    super(props);
    this.state = { title: '' };
  }

  handleChange (event) {
    this.setState({title: event.target.value});
  }


  handleSubmit (event) {
    event.preventDefault();
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

class Footer extends Component {
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

class Todos extends Component {

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

React.render(<Root />, document.body);
