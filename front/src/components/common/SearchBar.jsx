// src/components/common/SearchBar.jsx
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function SearchBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [inputValue, setInputValue] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Sync the local input state with the URL's search parameter on load or navigation.
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get("search");
    setInputValue(searchParam || ""); // Sets the input value to the URL's search param, or empty string.
  }, [location.search]);

  // Load recent searches from localStorage only once on mount.
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("recentSearch")) || [];
    setRecentSearches(history);
  }, []);

  const saveSearch = (term) => {
    if (!term) return;
    const history = JSON.parse(localStorage.getItem("recentSearch")) || [];
    const updated = [term, ...history.filter(item => item !== term)].slice(0, 10);
    localStorage.setItem("recentSearch", JSON.stringify(updated));
    setRecentSearches(updated);
  };

  // This function is the single point of truth for submitting a search.
  const submitSearch = (term) => {
    const q = (term || "").trim();
    if (!q) {
      // If the query is empty, remove the 'search' parameter from the URL.
      navigate('/cars', { replace: true });
    } else {
      saveSearch(q);
      const params = new URLSearchParams();
      params.set('search', q);
      navigate(`/cars?${params.toString()}`);
    }
    setShowHistory(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitSearch(inputValue);
  };

  const handleClickHistory = (term) => {
    setInputValue(term); // Update the input field with the clicked term.
    submitSearch(term); // Trigger a new search with the history term.
  };

  const handleClear = () => {
    setInputValue("");
    submitSearch(""); // Call submitSearch with an empty string to clear the filter.
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="flex items-center w-full">
        <div className="relative flex-1">
          {inputValue && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 left-3 flex items-center text-gray-700 z-10"
            >
              <FaTimes />
            </button>
          )}
          <button
            type="submit"
            className="absolute inset-y-0 right-3 flex items-center text-gray-700 hover:text-blue-500 z-10"
          >
            <FaSearch />
          </button>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setShowHistory(true)}
            onBlur={() => setTimeout(() => setShowHistory(false), 150)}
            placeholder="Search cars, models, brands..."
            className={`w-full ${inputValue ? 'pl-8' : 'pl-3'} pr-8 py-2 rounded-md border border-gray-500
                         focus:outline-none text-sm text-gray-800 placeholder-gray-700 bg-white/10 backdrop-blur-sm`}
          />
        </div>
      </form>
      {showHistory && recentSearches.length > 0 && (
        <div className="absolute top-full mt-1 w-full bg-white shadow-lg rounded-md z-50 max-h-60 overflow-auto">
          {recentSearches.map((item, i) => (
            <div
              key={i}
              onMouseDown={() => handleClickHistory(item)}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}