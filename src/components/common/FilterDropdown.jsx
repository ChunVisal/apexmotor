// src/components/common/FilterDropdown.jsx
import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function FilterDropdown({ placeholder, options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isNearRightEdge, setIsNearRightEdge] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      setIsNearRightEdge(viewportWidth - rect.right < 200);
    }
  }, [isOpen]);

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left w-fit" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="inline-flex justify-between items-center w-full rounded-md border border-gray-200 px-2 py-1 bg-white text-[12.5px] font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          <p className="truncate flex items-center gap-2">
            {value?.logo && <img src={value.logo} loading="lazy" alt={value.name} className="w-4 h-4" />}
            {value?.name || placeholder}
          </p>
          <FaChevronDown className={`ml-2 h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'} flex-shrink-0`} />
        </button>
      </div>

      {isOpen && (
        <div
          className={`absolute z-10 mt-2 rounded-md bg-white border border-gray-200 focus:outline-none ${
            isNearRightEdge ? "origin-top-right right-0 w-fit" : "origin-top-left left-0 w-fit"
          } max-w-xs`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          {/* ✅ The redundant title is now removed. */}
          <div className="py-1 max-h-60 whitespace-nowrap overflow-y-auto overflow-x-hidden custom-scrollbar" role="none">
            {options.map((option) => {
              const label = option.name || option; // string fallback
              return (
                <a
                  key={label}
                  onClick={() => handleOptionClick(option)}
                  className={`block px-4 py-2 text-[12.5px] text-gray-800 cursor-pointer hover:bg-gray-100 ${value?.name}`}
                  role="menuitem"
                >
                  {option.logo && <img src={option.logo} alt={option.name} className="w-4 h-4 inline-block mr-2" />}
                  {label}
                </a>
              );
            })}

          </div>
        </div>
      )}
    </div>
  );
}