import { Avatar, Divider, IconButton, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import { TodoItem as TodoItemType } from './type/TodoItem.type'
import CheckIcon from '@mui/icons-material/Check'
import DeleteIcon from '@mui/icons-material/Delete'
import dayjs from 'dayjs'
import { useAppDispatch } from '@/redux/store'
import { updateTodo, removeTodo } from '@/reducers/todo-reducer'

interface TodoItemProps {
    item: TodoItemType
}

const TodoItem = ({ item }: TodoItemProps) => {
    const dispatch = useAppDispatch()

    const onFinishClick = () => {
        dispatch(
            updateTodo({
                ...item,
                state: 'completed',
                finish_time: dayjs().unix(),
            }),
        )
    }

    const onDeleteClick = () => {
        dispatch(removeTodo(item.id))
    }

    return (
        <>
            <ListItem
                secondaryAction={
                    <>
                        <IconButton edge="end" aria-label="delete" onClick={onDeleteClick}>
                            <DeleteIcon color="error" />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={onFinishClick}>
                            <CheckIcon color="success" />
                        </IconButton>
                    </>
                }
            >
                <ListItemAvatar>
                    <Avatar>{item.name.slice(0, 2).toUpperCase() ?? 'TD'}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.name} secondary={item.description} />
                <ListItemText primary={`Finish until ${dayjs.unix(+item.time).format('DD/MM/YYYY HH:mm:ss')}`} />
            </ListItem>
            <Divider />
        </>
    )
}

export default TodoItem
