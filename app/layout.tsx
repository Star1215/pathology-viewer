import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'pathology-viewer',
  description: 'Created with bet',
  generator: 'bet',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
