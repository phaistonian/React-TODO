import React, { Component } from 'react';
import Todo from './Todo';
import { TransitionSpring } from 'react-motion';

export default class Todos extends Component {

  getDefaultValue () {
    let todos = this.props.todos;
    let configs = {};

    todos.forEach((todo, index) => {
      configs[`key-${index}`] = {
        opacity: { val: 0 }
      };
    });

    return configs;
  }

  getEndValue() {
    let todos = this.props.todos;
    let configs = {};

    todos.forEach((todo, index) => {
      configs[`key-${index}`] = {
        opacity: { val: 1 }
      };
    });

    return configs;
  }

  willEnter () {
    return {
      opacity: { val: 0 }
    };
  }

  willLeave () {

    return null;
    return {
      opacity: { val: 0 }
    };
  }

  render () {
    const configs = this.getEndValue();
    const todos = this.props.todos;


    console.log(Object.keys(configs));
    console.log(todos);
    return (
      <TransitionSpring
        defaultValue={this.getDefaultValue()}
        endValue={configs}
        willEnter={this.willEnter}
        willLeave={this.willLeave}>
        {currentValue =>
          <ul>
          {Object.keys(currentValue).map((key, index) => {
            let todo = todos[index];
            console.log(todo, Object.keys(currentValue));
            let style = {
              opacity: currentValue[key].opacity.val
            };

            return <Todo
              key={key}
              todo={todo}
              {...this.props}
              style={style} />;
          })}
          </ul>
        }
      </TransitionSpring>
    );
  }
}
