import React, { useEffect } from 'react'
import Header from './pages/main/components/Header'
import Footer from './pages/main/components/Footer'
import { Outlet, useNavigate } from 'react-router-dom'

export default function App() {
  const navigate = useNavigate()
  useEffect(()=>{
    const token = localStorage.getItem('token')
    token != undefined && navigate('/dashboard')
  },[])
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}
