import { TodoItem } from '@/components/todo-item/type/TodoItem.type'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const getTodoList = async () => {
    return await supabase.from('items').select()
}

const saveTodo = async (todo: TodoItem) => {
    return await supabase.from('items').insert(todo)
}

const updateTodo = async (todo: TodoItem) => {
    return await supabase.from('items').update(todo).match({ id: todo.id })
}

const deleteTodo = async (id: string) => {
    return await supabase.from('items').delete().match({ id })
}

export { getTodoList, saveTodo, deleteTodo, updateTodo }
