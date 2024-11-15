import React, { useState, useEffect } from "react";

const SearchBarForNavbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Handle typing animation effect by adding a delay to displaying letters
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative w-3/5 flex justify-center items-center gap-3">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search..."
        className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:border-gray-400 typing-animation"
      />
      <span className="absolute top-2 left-3 text-gray-500 bg-gray-200 typing-effect">
        {debouncedSearchTerm}
      </span>
    </div>
  );
};

export default SearchBarForNavbar;
