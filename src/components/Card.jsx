import React from "react";

const Card = ({ brewery }) => {
    console.log("Card received brewery:", brewery);
    
    return (
        <div className="flex gap-4">
            {/* Card 1: Location */}
            <div className="bg-[#7C2600]/35 p-6 rounded-lg shadow-lg ">
                <h3 className="text-sm font-bold text-[#7C2600] mb-2">LOCATION</h3>
                <p className="text-lg font-semibold text-[#7C2600]">{brewery ? (brewery.street || brewery.city) : "Select a brewery"}</p>
            </div>

            {/* Card 2: Phone */}
            <div className="bg-[#7C2600]/35 p-6 rounded-lg shadow-lg ">
                <h3 className="text-sm font-bold text-[#7C2600] mb-2">PHONE NUMBER</h3>
                <p className="text-lg font-semibold text-[#7C2600]">{brewery ? (brewery.phone || "Not available") : "Select a brewery"}</p>
            </div>

            {/* Card 3: Website */}
            <div className="bg-[#7C2600]/35 p-6 rounded-lg shadow-lg ">
                <h3 className="text-sm font-bold text-[#7C2600] mb-2">WEBSITE</h3>
                {brewery && brewery.website_url ? (
                    <a 
                        href={brewery.website_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-lg font-semibold text-[#7C2600] hover:underline"
                    >
                        Visit Website
                    </a>
                ) : (
                    <p className="text-lg font-semibold text-[#7C2600]">Not available</p>
                )}
            </div>
        </div>
    );
};

export default Card;
