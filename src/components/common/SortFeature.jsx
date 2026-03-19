// src/components/common/SortFeature.jsx
import { useState, useEffect, useRef, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const SortModal = ({ onClose, onSortSelect, availableSorts, resetSort }) => {
  const panelRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.body.style.overflow = "hidden"; // lock scroll

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = ""; // unlock scroll
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50"
      aria-modal="true"
      role="dialog"
      aria-labelledby="sort-modal-title"
    >
      <div
        ref={panelRef}
        className="bg-white rounded-md shadow-lg max-h-[80vh] w-[80vw] max-w-sm p-6 py-4 overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-5">
          <h2 id="sort-modal-title" className="text-md font-semibold text-gray-900">
            Sort Options
          </h2>
          <button
            onClick={onClose}
            aria-label="Close sort modal"
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>

        <div className="space-y-6">
          {Object.entries(availableSorts).map(([category, options]) => (
            <div key={category}>
              <h3 className="text-gray-700 text-sm font-medium mb-1">{category}</h3>
              <ul className="grid grid-cols-2 gap-3">
                {options.map((option) => (
                  <li
                    key={option}
                    tabIndex={0}
                    onClick={() => onSortSelect({ category, option })}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        onSortSelect({ category, option });
                      }
                    }}
                    className="text-[12.5px] cursor-pointer rounded border border-gray-300 px-2 py-1 text-center text-gray-600 hover:bg-blue-100 hover:border-blue-400 focus:bg-blue-100 focus:border-blue-400 focus:outline-none select-none"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Reset Button */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={resetSort}
            className="px-4 py-1 mt-1 text-[12.5px] bg-red-500 text-white rounded hover:bg-red-600"
          >
            Reset Sort
          </button>
        </div>
      </div>
    </div>
  );
};

export default function SortFeature({ cars = [], onSortChange, resetSort }) {
  const [open, setOpen] = useState(false);

  const availableSorts = useMemo(() => {
    if (!cars || cars.length === 0) return {};

    return {
      Price: ["Low to High", "High to Low"],
      Year: ["Newest", "Oldest"],
      Mileage: ["Low to High", "High to Low"],
    };
  }, [cars]);

  const handleSortSelect = ({ category, option }) => {
    let key, order;
    switch (category) {
      case "Price":
        key = "price";
        order = option === "Low to High" ? "asc" : "desc";
        break;
      case "Year":
        key = "year";
        order = option === "Newest" ? "desc" : "asc";
        break;
      case "Mileage":
        key = "mileage";
        order = option === "Low to High" ? "asc" : "desc";
        break;
      default:
        key = null;
        order = null;
    }
    if (key && order) onSortChange?.({ key, order, category, option });
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 bg-white border border-gray-200 rounded px-3 text-[12.5px] text-gray-800"
      >
        <FontAwesomeIcon icon={faBars} />
        <p>Sort</p>
      </button>

      {open && (
        <SortModal
          onClose={() => setOpen(false)}
          availableSorts={availableSorts}
          onSortSelect={handleSortSelect}
          resetSort={() => {
            resetSort?.();
            setOpen(false);
          }}
        />
      )}
    </>
  );
}
