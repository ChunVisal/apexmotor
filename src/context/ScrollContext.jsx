// src/context/ScrollContext.jsx
import { createContext, useContext, useRef } from 'react';

const ScrollContext = createContext();

export function ScrollProvider({ children }) {
  const scrollPositions = useRef({});

  const saveScrollPosition = (path) => {
    scrollPositions.current[path] = window.scrollY;
  };

  const getScrollPosition = (path) => {
    return scrollPositions.current[path] || 0;
  };

  return (
    <ScrollContext.Provider value={{ saveScrollPosition, getScrollPosition }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScroll() {
  return useContext(ScrollContext);
}