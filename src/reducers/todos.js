const initialState = [{
  id: 0,
  title: 'First todo',
  completed: false
}];

let counter = 0;

export default function todos (state = initialState, action) {
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
