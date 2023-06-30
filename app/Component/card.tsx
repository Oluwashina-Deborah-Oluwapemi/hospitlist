"use client";
// Card.tsx

import React, { useEffect, useState } from "react";
import { getListings } from "@/services";
import ReactMarkdown from "react-markdown";
import ExportHospitalsButton from "./btn";

interface Hospital {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  description: string;
}

const Card: React.FC = () => {
  const [listings, setListings] = useState<Hospital[]>([]);
  const [filteredListings, setFilteredListings] = useState<Hospital[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getListings();
        setListings(result);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (searchQuery: string) => {
    const filtered = listings.filter((listing) =>
      Object.values(listing).some((value) =>
        value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredListings(filtered);
  };

  const displayListings =
    filteredListings.length > 0 ? filteredListings : listings;

  const handleShare = (
    email: string,
    name: string,
    address: string,
    phone: string
  ) => {
    const subject = `Hospital Information (${name})`;
    const body = `Hospital Name: ${name}\nAddress: ${address}\nEmail: ${email}\nPhone Number: ${phone}`;
    const mailtoLink = `mailto:sample@mail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="container mx-auto py-8">
      <HospitalSearch
        onSearch={handleSearch}
        displayListings={displayListings}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {displayListings.map((listing) => (
          <div
            key={listing.id}
            className="bg-[#f07900] text-black rounded-lg shadow-lg p-4 transform hover:-translate-y-1 hover:shadow-xl transition duration-300"
          >
            <div className="font-bold text-[blue]">{listing.name}</div>
            <div className="text-black">{listing.address}</div>
            <div className="text-black">{listing.email}</div>
            <div className="text-black">{listing.phone}</div>
            <div className="mt-4">
              <ReactMarkdown className="text-black">
                {listing.description}
              </ReactMarkdown>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() =>
                handleShare(
                  listing.email,
                  listing.name,
                  listing.address,
                  listing.phone
                )
              }
            >
              Share
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

interface HospitalSearchProps {
  onSearch: (searchQuery: string) => void;
  displayListings: Hospital[];
}

const HospitalSearch: React.FC<HospitalSearchProps> = ({
  onSearch,
  displayListings,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="mb-4 flex flex-col items-center">
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Enter location or select from nearby cities"
        className="border border-gray-300 rounded-l-full rounded-r-full px-4 py-2 focus:outline-none focus:border-blue-500 w-full max-w-md"
      />
      <div className="mt-2">
        <ExportHospitalsButton displayListings={displayListings} />
      </div>
    </div>
  );
};

export default Card;
