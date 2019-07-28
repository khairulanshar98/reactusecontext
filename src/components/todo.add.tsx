import * as React from "react";
import { Form } from 'react-bootstrap';
import { Todo, ActionType, stateCtx } from "../store/todo.store";
const uuidv4 = require('uuid/v4');


export const TodoAdd: React.FC = (props) => {
    const [task, setTask] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [todos, dispatch] = React.useContext(stateCtx);
    return (
        <div style={{ marginBottom: "40px" }}>
            <Form>
                <Form.Group controlId="NewTask">
                    <Form.Label>New Task</Form.Label>
                    <input
                        type='text'
                        value={task}
                        placeholder="Name"
                        onChange={e => setTask(e.target.value)}
                        required
                        className="form-control"
                    />
                </Form.Group>
                <Form.Group controlId="NewTask">
                    <Form.Label>Description</Form.Label>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="form-control"
                        placeholder="Description"
                        rows={3}
                    />
                </Form.Group>
            </Form>
            <button className="btn btn-primary"
                onClick={e => {
                    const newTask: Todo = { task: task, isComplete: false, id: uuidv4(), description: description, createdAt: new Date().getTime(), completedAt: 0 }
                    dispatch({ type: ActionType.CREATE, data: newTask });
                    setTask('');
                    setDescription('');
                }}>Add</button>
        </div >
    )
}