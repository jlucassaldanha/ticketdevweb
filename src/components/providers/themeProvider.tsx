"use client"

import { ThemeProvider } from 'next-themes';

export function ShadcnThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof ThemeProvider>) {
  return <ThemeProvider {...props}>{children}</ThemeProvider>
}