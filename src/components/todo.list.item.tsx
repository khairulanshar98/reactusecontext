import * as React from "react";
import { Alert, Button } from 'react-bootstrap';
import { Todo, ActionType, todoContext } from "../store/todo.store";
interface TodoListItemProps {
    todo: Todo
}

export const TodoListItem: React.FC<TodoListItemProps> = (props) => {
    const [todos, dispatch] = React.useContext(todoContext);
    const [show, setShow] = React.useState<boolean>(true);
    const [todo, setTodo] = React.useState<Todo>(props.todo);
    React.useEffect(() => {
        setTodo(props.todo)
    });
    const formatDate = (date_: number) => {
        var MMMM = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        var date = new Date(date_);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? 0 + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return (
            date.getDate() +
            ' ' +
            MMMM[date.getMonth()] +
            ' ' +
            date.getFullYear() +
            '  ' +
            strTime
        );
    }

    const handleComplete = () => {
        dispatch({ type: ActionType.COMPLETE, data: todo });
    }
    const handleClose = () => {
        if (!todo.isComplete && confirm(`${todo.task} is not completed.\n Do you want to delete?`))
            setShow(false)
        if (todo.isComplete) setShow(false)
    }
    return (
        <Alert show={show} onClose={() => handleClose()} variant={"info"} dismissible>
            <Alert.Heading>Task: {todo.task}</Alert.Heading>
            <div>
                Description: {todo.description.split("\n").map((text, idx) => <p key={idx}>{text}</p>)}
            </div>
            <p>
                Status: <span style={{ fontSize: '14px', color: todo.isComplete ? 'green' : 'red' }} className={'glyphicon glyphicon-' + (todo.isComplete ? 'ok-sign' : 'remove-sign')}></span>
            </p>
            <p>
                Created At: {formatDate(todo.createdAt)}
            </p>
            {todo.isComplete && <p>
                Completed At: {formatDate(todo.completedAt)}
            </p>}
            <div className="d-flex justify-content-end" style={{ marginTop: "15px" }}>
                {!todo.isComplete &&
                    <Button onClick={() => handleComplete()} variant="outline-success">
                        Complete me ya'll!
                    </Button>
                }
            </div>
        </Alert>
    )
}