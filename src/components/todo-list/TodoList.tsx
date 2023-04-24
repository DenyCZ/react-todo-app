import { Card, CardContent, Typography, List } from '@mui/material'
import { TodoItem as TodoItemType } from '@/components/todo-item/type/TodoItem.type'
import TodoItem from '../todo-item/TodoItem'

interface TodoListProps {
    variant: 'completed' | 'remaining'
    items: TodoItemType[]
}

const TodoList = ({ variant, items }: TodoListProps) => {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {variant === 'completed' ? 'Completed' : 'Remaining'} tasks
                </Typography>
                <List>
                    {items?.map((thisItem: TodoItemType) => (
                        <TodoItem key={thisItem.id} item={thisItem} />
                    ))}
                </List>
            </CardContent>
        </Card>
    )
}

export default TodoList
