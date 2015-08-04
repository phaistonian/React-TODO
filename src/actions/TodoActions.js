// Action creators
export function add (title) {
  return {
    type: 'ADD',
    title
  };
}

export function remove (id) {
  return {
    type: 'REMOVE',
    id
  };
}

export function complete (id) {
  return {
    type: 'COMPLETE',
    id
  };
}

export function uncomplete (id) {
  return {
    type: 'UNCOMPLETE',
    id
  };
}

export function edit (id) {
  return {
    type: 'EDIT',
    id
  };
}

export function done_editing (id) {
  return {
    type: 'DONE_EDITING',
    id
  };
}

export function update (id, title) {
  return {
    type: 'UPDATE',
    id,
    title
  };
}
