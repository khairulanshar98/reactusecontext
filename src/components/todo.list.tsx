import * as React from "react";
import { Row, Form } from 'react-bootstrap';
import { TodoListItem } from './todo.list.item';
import { Todo, todoContext } from "../store/todo.store";

export const TodoList: React.FC = (props) => {
    const [todos, dispatch] = React.useContext(todoContext);
    const [filter, setFilter] = React.useState<string>('');
    const [filtered, setFiltered] = React.useState<Todo[]>(todos);

    React.useEffect(() => {
        if (!filter) {
            setFiltered(todos)
        }
    });

    const filterTask = (text_: string): void => {
        if (text_.length) {
            const todos_: Todo[] = todos.filter((todo) => todo.task.toLowerCase().indexOf(text_.toLowerCase()) >= 0 || todo.description.toLowerCase().indexOf(text_.toLowerCase()) >= 0)
            setFiltered(todos_)
        } else {
            setFiltered(todos)
        }
    }

    return (
        <div>
            {(filtered.length > 1 || filter) &&
                <Row style={{ padding: "20px" }}>
                    <Form.Row>
                        <Form.Group controlId="filter">
                            <input
                                type='text'
                                value={filter}
                                placeholder="Search"
                                onChange={(e) => {
                                    setFilter(e.target.value)
                                    filterTask(e.target.value)
                                }}
                                required
                                className="form-control"
                            />
                        </Form.Group>
                    </Form.Row>
                </Row>}
            {filtered.map((todo, idx) => <TodoListItem key={idx} todo={todo} />)}
        </div>
    )
}