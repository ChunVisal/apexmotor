// src/context/SearchContext.jsx
import React, { createContext, useState, useContext } from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {
    const [searchQuery, setSearchQuery] = useState(""); 

    return (
        <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
            {children}
        </SearchContext.Provider>
    );
}

export function useSearch() {

    const context = useContext(SearchContext);

    if (!context) {
        return { searchQuery: "", setSearchQuery: () => {} };
    }
    return context;
}