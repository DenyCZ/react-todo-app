import { FC } from 'react'
import { Dashboard } from '@/pages/dashboard/Dashboard'
import { Pokemon } from '@/pages/pokemon/Pokemon'

export interface IRoute {
    path: string
    element: FC
    auth: boolean
}

export const routePublic: IRoute[] = [
    { path: '/', element: Dashboard, auth: false },
    { path: '/pokemon', element: Pokemon, auth: false },
    { path: '*', element: Dashboard, auth: false },
]
