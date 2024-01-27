import React, { useState } from 'react';

const DropdownMenu = ({ selectedYear, onYearChange }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleYearChange = (year) => {
    onYearChange(year);
    toggleDropdown(); // Close the dropdown after selection
  };

  return (
    <div className="relative">
      <button
        id="dropdownDividerButton"
        onClick={toggleDropdown}
        className="text-white bg-lightblue hover:bg-mediumblue focus:ring-4 focus:outline-none focus:ring-blue-300 font-wotfard rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-lightblue dark:hover:bg-mediumblue dark:focus:ring-blue-800"
        type="button"
      >
        adjust year
        <svg
          className={`w-2.5 h-2.5 ms-3 ${isDropdownVisible ? 'transform rotate-180' : ''}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
        </svg>
      </button>

      {isDropdownVisible && (
        <div className="z-10 absolute top-full left-0 bg-lightestblue divide-y divide-mediumblue rounded-lg shadow w-44">
          <ul className="py-2 text-sm text-gray-700">
            {[2021, 2022, 2023, 2024].map((year) => (
              <li key={year}>
                <a
                  href="#"
                  onClick={() => handleYearChange(year)}
                  className="block px-4 py-2 hover:bg-mediumblue hover:text-white"
                >
                  {year}
                </a>
              </li>
            ))}
          </ul>
          <div className="py-2">
            <a
              href="#"
              onClick={() => handleYearChange('all-time')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-mediumblue hover:text-white"
            >
              all-time stats
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
