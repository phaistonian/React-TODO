import React, { Component } from 'react';
import Todo from './Todo';
import { TransitionSpring } from 'react-motion';

export default class Todos extends Component {

  getEndValue() {
    let todos = this.props.todos;
    let configs = {};

    todos.forEach((todo, index) => {
      configs[index] = {
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

  render () {
    const configs = this.getEndValue();
    return (
      <TransitionSpring
        endValue={configs}
        willEnter={this.willEnter}>
        {currentValue =>
          <ul>
          {this.props.todos.map((todo, index) => {
            if (!currentValue[index]) {
              console.log(currentValue, index);
            }
            if (!currentValue[index]) {
              console.log(currentValue[index], Object.keys(configs).length, configs);
              console.log(currentValue);
              console.log(index);
              console.log(configs);
            }
            let style = {
              opacity: currentValue[index].opacity.val
            };

            return <Todo
                        key={index}
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
