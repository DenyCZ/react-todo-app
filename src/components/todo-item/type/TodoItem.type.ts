export type TodoItem = {
    id: string
    name: string
    description: string
    time: string | number
    finish_time: string | number
    state: 'active' | 'completed'
}
