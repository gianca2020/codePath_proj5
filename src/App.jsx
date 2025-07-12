import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import NavBar from './components/Navbar'
import List from './components/List'
import Card from './components/Card'

function App() {
  return (
    <>
    <div className=" bg-[#FFFBEA]">
      <div className="flex h-screen">
        <NavBar /> {/* NavBar should have its own width and background */}
        <div className="flex-1 flex flex-col justify-center items-center gap-4"> {/* This will take remaining space regardless of NavBar width */}
          <List />
        </div>
      </div>
    </div>

    </>
  )
}

export default App
