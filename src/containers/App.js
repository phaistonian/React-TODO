import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Todos from '../components/Todos';
import Footer from '../components/Footer';
import * as TodoActions from '../actions/TodoActions';
import { MAX_TODOS } from '../constants/AppConstants';

@connect(state => ({ todos: state }))
export default class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      hideCompleted: false,
      element: null
    };
  }

  componentDidMount () {
    this.setState({
      element: React.findDOMNode(this)
    });
  }

  hideCompleted (hideCompleted) {
    this.setState({
      hideCompleted: hideCompleted
    });
  }

  render () {
    const { todos, dispatch } = this.props;
    const actions = bindActionCreators(TodoActions, dispatch);

    let filteredTodos;
    if (this.state.hideCompleted) {
      filteredTodos = todos.filter(todo => !todo.completed);
    } else {
      filteredTodos = todos;
    }

    const shouldFocusOnInput = true;

    return (
      <div>
        <Header
          shouldFocusOnInput={shouldFocusOnInput}
          todos={filteredTodos}
          rootElement={this.state.element}
          add={actions.add}
          todosLeft={MAX_TODOS - todos.length} />

        <Todos todos={filteredTodos} {...actions} />
        <Footer hideCompleted={::this.hideCompleted} />
      </div>
    );
  }
}
