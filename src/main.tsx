import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MainRouter } from './router/MainRouter'
import { store } from '@/redux/store'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <MainRouter />
            </BrowserRouter>
        </Provider>
    </StrictMode>,
)
