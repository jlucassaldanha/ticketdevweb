'use client'

import { QueryProviders } from '@/components/providers/queryProvider'
import { ShadcnThemeProvider } from '@/components/providers/themeProvider'
import { User, AuthProvider } from '@/contexts/authContext'

export default function AppProvider({ children, user, token }: { children: React.ReactNode, user: User | null, token: string | undefined}) {
  return (
    <QueryProviders>
      <ShadcnThemeProvider
        attribute="class"
        defaultTheme='dark'
        enableSystem
        disableTransitionOnChange
      >
        <AuthProvider user={user} token={token}>
          {children}
        </AuthProvider>
      </ShadcnThemeProvider>
    </QueryProviders>
  )
}