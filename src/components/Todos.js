import React, { Component } from 'react';
import Todo from './Todo';
import { TransitionSpring } from 'react-motion';

export default class Todos extends Component {

  getDefaultValue () {
    let todos = this.props.todos;
    let configs = {};

    todos.forEach((todo, index) => {
      configs[`${index}`] = {
        opacity: { val: 0 },
        y: { val: -5},
        todo
      };
    });

    return configs;
  }

  getEndValue() {
    let todos = this.props.todos;
    let configs = {};

    todos.forEach((todo, index) => {
      configs[`${index}`] = {
        opacity: { val: 1 },
        y: { val: 0 },
        todo
      };
    });

    return configs;
  }

  willEnter (id) {
    return {
      opacity: { val: 0 },
      y: { val: -5},
      todo: this.props.todos[id]
    };
  }

  willLeave () {
    return null;
  }

  render () {
    const configs = this.getEndValue();

    return (
      <TransitionSpring
        endValue={configs}
        willEnter={::this.willEnter}
        willLeave={::this.willLeave}>
        {currentValue =>
          <ul>
          {Object.keys(currentValue).map((key) => {
            let todo = currentValue[key].todo;
            let style = {
              opacity: currentValue[key].opacity.val,
              transform: `translateY(${currentValue[key].y.val}px)`
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
