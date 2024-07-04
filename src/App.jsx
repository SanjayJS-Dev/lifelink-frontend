import React from 'react'
import Header from './pages/main/components/Header'
import Footer from './pages/main/components/Footer'
import { Outlet } from 'react-router-dom'

export default function App() {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}
