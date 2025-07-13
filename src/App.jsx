import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import NavBar from './components/Navbar'
import List from './components/List'
import Card from './components/Card'

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
    <div className=" bg-[#FFFBEA]">
      <div className="flex h-screen">
        <NavBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <div className="flex-1 flex flex-col justify-center items-center gap-4">
          <List searchTerm={searchTerm} />
        </div>
      </div>
    </div>

    </>
  )
}

export default App
