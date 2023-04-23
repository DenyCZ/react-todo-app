import { ReactNode } from 'react'
import { Header } from '@/components/header/Header'
import { Stack } from '@mui/material'

export const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <Stack height={`100vh`}>
            <Header />
            {children}
        </Stack>
    )
}
