import { Route, Routes } from 'react-router-dom'
import { IRoute, routePublic } from '@/router/routes/routePublic'
import AuthHOC from '@/router/routerComponents/AuthHOC'
import { routeDashboard } from '@/router/routes/routeDashboard'
import { CssBaseline } from '@mui/material'
import { ThemeSettingProvider } from '@/theme/theme'

export const MainRouter = () => {
    const allRoutes: IRoute[] = [...routePublic, ...routeDashboard]

    return (
        <ThemeSettingProvider>
            <CssBaseline />
            <Routes>
                {allRoutes.map((route: IRoute) => {
                    const ReturnComponent = AuthHOC(route.element, route.auth)
                    return <Route path={route.path} element={<ReturnComponent />} key={route.path} />
                })}
            </Routes>
        </ThemeSettingProvider>
    )
}
