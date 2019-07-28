import * as React from 'react';

export interface Todo {
  id: string
  task: string
  description: string
  isComplete: boolean
  createdAt: number
  completedAt: number
}

export enum ActionType {
  CREATE = 'ADD_TASK',
  COMPLETE = 'COMPLETE_TASK',
}

export interface IAction {
  type: ActionType
  data: Todo
}
export const initialTodos: Todo[] = [];

export const reducer = (state: Todo[], action: IAction): Todo[] => {
  //Object.freeze(state);
  const todos: Todo[] = [...state];
  switch (action.type) {
    case ActionType.CREATE:
      todos.push(action.data);
      return todos;
    case ActionType.COMPLETE:
      const index = todos.findIndex(todo => todo.id === action.data.id);
      todos[index].isComplete = true;
      todos[index].completedAt = new Date().getTime();
      return todos;
    default:
      throw new Error();
  }
};


export const stateCtx = React.createContext<[Todo[], React.Dispatch<IAction>]>([initialTodos, (() => 0)]);
export const TodoListProvider: React.FC = (props) => {
  const [todos, dispatch] = React.useReducer(reducer, initialTodos);
  return (
    <stateCtx.Provider value={[todos, dispatch]}>
      {props.children}
    </stateCtx.Provider>
  );
}