import React from "react";
import { useState } from "react";

const NavBar = ({ searchTerm, onSearchChange }) => {
    const [showAboutPopup, setShowAboutPopup] = useState(false);
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
            <li className="cursor-pointer hover:bg-[#7C2600]/20 p-2 rounded">Dashboard</li>
            <li 
              className="cursor-pointer hover:bg-[#7C2600]/20 p-2 rounded"
              onClick={() => setShowAboutPopup(true)}
            >
              About
            </li>
          </ul>
        </div>

        {/* About Popup */}
        {showAboutPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md mx-4 shadow-xl border-2 border-[#7C2600]">
              <h2 className="text-2xl font-bold text-[#7C2600] mb-4">About Pub Finder</h2>
              <p className="text-gray-700 mb-4">
                this will help you find cool bars in your city
              </p>
              <p className="text-gray-700 mb-6">
                Click on any brewery in the list to see detailed information including location, 
                phone number, and website!
              </p>
              <button 
                onClick={() => setShowAboutPopup(false)}
                className="bg-[#7C2600] text-white px-4 py-2 rounded-lg hover:bg-[#7C2600]/80 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
        </>
    )   
}

export default NavBar;
