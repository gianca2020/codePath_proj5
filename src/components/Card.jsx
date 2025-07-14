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
                <p className="text-lg font-semibold text-[#7C2600]">{brewery ? (brewery.street   ? `${brewery.street}` : brewery.street) : "Select a brewery"}</p>
                <p className="text-sm font-semibold text-[#7C2600] ">{brewery ? (brewery.city  ? `${brewery.city}, ${brewery.state}` : brewery.city) : ""}</p>
            </div>

            {/* Card 2: Contact */}
            <div className="bg-[#7C2600]/35 p-6 rounded-lg shadow-lg ">
                <h3 className="text-sm font-bold text-[#7C2600] mb-2">CONTACT</h3>
                {brewery ? (
                    <div className="space-y-2">
                        <p className="text-lg font-semibold text-[#7C2600]">
                            {formatPhoneNumber(brewery.phone)}
                        </p>
                        {brewery.website_url && (
                            <a 
                                href={brewery.website_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-sm font-semibold text-[#7C2600] hover:underline block"
                            >
                                Visit Website
                            </a>
                        )}
                    </div>
                ) : (
                    <p className="text-lg font-semibold text-[#7C2600]">Select a brewery</p>
                )}
            </div>

            {/* Card 3: Type & Status */}
            <div className="bg-[#7C2600]/35 p-6 rounded-lg shadow-lg ">
                <h3 className="text-sm font-bold text-[#7C2600] mb-2">INFO</h3>
                {brewery ? (
                    <div className="space-y-1">
                        <p className="text-lg font-semibold text-[#7C2600]">
                            {brewery.brewery_type || "Brewery"}
                        </p>
                        <p className="text-sm text-[#7C2600]">
                            {brewery.state || "Unknown State"}
                        </p>
                    </div>
                ) : (
                    <p className="text-lg font-semibold">Select a brewery</p>
                )}
            </div>
        </div>
    );
};

export default Card;
