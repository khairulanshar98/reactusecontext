import * as React from 'react';
import { TodoListProvider } from "../store/todo.store";
import { TodoAdd } from './todo.add'
import { TodoList } from './todo.list'
interface AppProps { compiler: string; framework: string; store: string; }

export const App: React.FC<AppProps> = (props) => {
    return (
        <TodoListProvider>
            <div className="container">
                <h1 className="title">Simple Task List with {props.compiler}, {props.framework} and {props.store}! <a className="btn btn-primary" target="_blank" href="https://github.com/khairulanshar98/reactusecontext">source</a></h1>
                <div className="col-sm-4">
                    <TodoAdd />
                </div>
                <div className="col-sm-8">
                    <TodoList />
                </div>
            </div>
        </TodoListProvider>
    )
}