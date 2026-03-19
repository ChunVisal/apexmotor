// src/components/common/SimpleDropdown.jsx
import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

const SimpleDropdown = ({ 
  options = [], 
  placeholder = "Select...", 
  width = "200px", 
  onChange, 
  className = "", 
  value 
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value || null);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (value) setSelected(value);
  }, [value]);

  const handleSelect = (opt) => {
    setSelected(opt);
    setOpen(false);
    if (onChange) onChange(typeof opt === "string" ? opt : opt.name);
  };

  return (
    <div 
      ref={ref} 
      className={`relative text-sm ${className}`} 
      style={{ width }}
    >
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex justify-center text-xs font-medium items-center px-2 py-1 
                   cursor-pointer text-gray-100"
      >
       <p className="truncate">
        {typeof selected === "string" ? selected : selected?.name || placeholder}
      </p>
         <FaChevronDown className={`ml-5  h-3 w-3 transition-transform duration-200 ${open ? 'rotate-180' : 'rotate-0'} flex-shrink-0`} />
      </button>

      {/* Dropdown */}
      {open && (
        <ul
          className="absolute left-0 mt-1 w-full
                      z-50 max-h-55 overflow-y-auto bg-white text-sm shadow-md rounded-sm custom-scrollbar"
          role="listbox"
        >
          {options.map((opt, i) => (
           <li
              key={(typeof opt === "string" ? opt : opt.name) + i}
              onClick={() => handleSelect(opt)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleSelect(opt)}
              role="option"
              tabIndex={0}
              className="px-3 py-2 cursor-pointer text-gray-700 flex items-center gap-2"
            >
              {opt.logo && <img src={opt.logo} alt={opt.name} className="w-4 h-4" />}
              {typeof opt === "string" ? opt : opt.name}
            </li>

          ))}
        </ul>
      )}
    </div>
  );
};

export default SimpleDropdown;
