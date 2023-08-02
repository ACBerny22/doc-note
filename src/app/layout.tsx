import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import { Rubik, Outfit } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

const rubik = Rubik({
  subsets:['latin'],
})

const outfit = Outfit({
  subsets:['latin'],
})

export const metadata: Metadata = {
  title: 'Doc-Note',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
  
      <body className={outfit.className}>
        <NavBar/>
        {children}
      </body>
    </html>
  )
}
