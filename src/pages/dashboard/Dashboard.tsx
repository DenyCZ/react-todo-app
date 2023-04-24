import Form from '@/components/form/Form'
import TodoList from '@/components/todo-list/TodoList'
import { TodoItem } from '@/components/todo-item/type/TodoItem.type'
import { setTodoList } from '@/reducers/todo-reducer'
import { RootState } from '@/redux/rootReducer'
import { useAppSelector, useAppDispatch } from '@/redux/store'
import { getTodoList } from '@/services/supabase/supabase.service'
import { Container, Grid } from '@mui/material'
import { useEffect } from 'react'
import { shallowEqual } from 'react-redux'

const Dashboard = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const hydrate = async () => {
            const { data, error } = await getTodoList()

            if (error) {
                console.error(error)
                return
            }

            dispatch(setTodoList(data as TodoItem[]))
        }

        hydrate()
    }, [])

    const items: TodoItem[] = useAppSelector((state: RootState) => state.todo.todoList, shallowEqual)

    return (
        <Container maxWidth="xl" sx={{ padding: '1rem' }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Form />
                </Grid>
                <Grid item xs={6}>
                    <TodoList variant="remaining" items={items?.filter((item) => item.state === 'active') ?? []} />
                </Grid>
                <Grid item xs={6}>
                    <TodoList variant="completed" items={items?.filter((item) => item.state === 'completed') ?? []} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default Dashboard
