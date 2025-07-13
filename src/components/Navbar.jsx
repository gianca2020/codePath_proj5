import React from "react";

const NavBar = ({ searchTerm, onSearchChange }) => {
    return(
        <>
        <div className="flex flex-col bg-[#BD4B00]/35 h-screen w-64 text-[#7C2600]">
          <ul>
            <div className="font-bold text-xl mb-4">
            <h1>Pub Finder</h1>
            </div>

            <div className="mb-4">
              <input 
                type="text" 
                placeholder="Enter city name..." 
                value={searchTerm || ""}
                onChange={(e) => onSearchChange(e.target.value)}
                className="border border-[#7C2600] mt-4 p-2 rounded-lg w-50% text-lg" 
              />
            </div>
            <li>Dashboard</li>
            <li>About</li>
          </ul>
        </div>
        </>
    )   
}

export default NavBar;
