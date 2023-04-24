import Dashboard from '@/pages/dashboard/Dashboard'
import { IRoute } from '@/router/routes/routePublic'

export const routeDashboard: IRoute[] = [{ path: '/dashboard', element: Dashboard, auth: false }]
