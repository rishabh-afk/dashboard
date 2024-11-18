import { useState } from "react";
import { CiFilter } from "react-icons/ci";
import { debounce } from "../../data/generalFunctions";

interface SearchFilterProps {
  placeholder: string;
  searchTerm: string;
  options: { label: string; value: string }[];
  onSearch: (searchTerm: string, selectedOption: string) => void;
  setSearchTerm: (searchTerm: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  options,
  onSearch,
  placeholder,
  searchTerm,
  setSearchTerm,
}) => {
  const [selectedOption, setSelectedOption] = useState(options[0]?.value);

  const handleSearchClick = () => {
    onSearch(searchTerm, selectedOption);
  };

  return (
    <div className="flex flex-col">
      <p className="px-4 py-1 inline-flex font-semibold gap-1 items-center">
        <CiFilter size={25} /> Filters
      </p>
      <div className="w-full p-4 pt-1 flex items-center">
        <select
          className="rounded-l-lg border border-r-0 outline-none focus:outline-none border-gray-300 p-2"
          value={selectedOption}
          onChange={(e) => {
            setSearchTerm("");
            setSelectedOption(e.target.value);
          }}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <input
          type="text"
          className="border border-gray-300 border-l-0 p-[7.3px] flex-grow outline-none focus:outline-none rounded-none rounded-r-lg"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button
          onClick={debounce(handleSearchClick, 1000)}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;
