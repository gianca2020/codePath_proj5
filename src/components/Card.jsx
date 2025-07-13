import React from "react";

const Card = ({ brewery }) => {
    console.log("Card received brewery:", brewery);
    
    // Function to format phone number
    const formatPhoneNumber = (phone) => {
        if (!phone) return "Not available";
        
        // Remove all non-digit characters
        const cleaned = phone.replace(/\D/g, '');
        
        // Format as (XXX) XXX-XXXX if it's 10 digits
        if (cleaned.length === 10) {
            return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
        }
        
        // If not 10 digits, return original
        return phone;
    };
    
    return (
        <div className="flex gap-4">
            {/* Card 1: Location */}
            <div className="bg-[#7C2600]/35 p-6 rounded-lg shadow-lg ">
                <h3 className="text-sm font-bold text-[#7C2600] mb-2">LOCATION</h3>
                <p className="text-lg font-semibold text-[#7C2600]">{brewery ? (brewery.street) : "Select a brewery"}</p>
            </div>

            {/* Card 2: Phone */}
            <div className="bg-[#7C2600]/35 p-6 rounded-lg shadow-lg ">
                <h3 className="text-sm font-bold text-[#7C2600] mb-2">PHONE NUMBER</h3>
                <p className="text-lg font-semibold text-[#7C2600]">
                    {brewery ? formatPhoneNumber(brewery.phone) : "Select a brewery"}
                </p>
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
                    <p className="text-lg font-semibold">Not available</p>
                )}
            </div>
        </div>
    );
};

export default Card;
