import { combineReducers } from '@reduxjs/toolkit'
import todoReducer from '@/reducers/todo-reducer'

export const rootReducer = combineReducers({
    todo: todoReducer,
})

export type RootState = ReturnType<typeof rootReducer>
