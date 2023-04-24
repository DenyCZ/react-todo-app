import { TodoItem } from '@/components/todo-item/type/TodoItem.type'
import { deleteTodo, saveTodo, updateTodo as updateTodoSupabase } from '@/services/supabase/supabase.service'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface TodoState {
    todoList: TodoItem[]
}

const initialState: TodoState = {
    todoList: [],
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        setTodoList: (state, action: PayloadAction<TodoItem[]>) => {
            state.todoList = action.payload
        },
        addTodo: (state, action: PayloadAction<TodoItem>) => {
            saveTodo(action.payload)
            state.todoList.push(action.payload)
        },
        removeTodo: (state, action: PayloadAction<string>) => {
            deleteTodo(action.payload)
            state.todoList = state.todoList.filter((todo) => todo.id !== action.payload)
        },
        updateTodo: (state, action: PayloadAction<TodoItem>) => {
            updateTodoSupabase(action.payload)
            state.todoList = state.todoList.map((todo) => {
                if (todo.id === action.payload.id) {
                    return action.payload
                }
                return todo
            })
        },
    },
})

export const { addTodo, removeTodo, updateTodo, setTodoList } = todoSlice.actions

export default todoSlice.reducer
