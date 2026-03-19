// src/utils/useSessionScroll.jsx
import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

// Define the paths where we want to restore scroll position.
const RESTORABLE_PATHS = ["/", "/cars"];

// Get the scroll container element
function getScroller() {
  return document.getElementById("app-scroll");
}

export default function useSessionScroll() {
  const location = useLocation();
  const navType = useNavigationType();
  const isRestored = useRef(false);
  const lastPath = useRef(location.pathname);

  useEffect(() => {
    const scroller = getScroller();
    if (!scroller) return;

    // Save scroll position before leaving the page
    const saveScrollPosition = () => {
      if (RESTORABLE_PATHS.includes(location.pathname)) {
        sessionStorage.setItem("carlist-scroll", scroller.scrollTop.toString());
      }
    };

    // Add scroll listener to save position
    scroller.addEventListener("scroll", saveScrollPosition);

    // Handle different navigation types
    if (navType === "POP") {
      // Back/forward navigation - restore scroll position
      if (RESTORABLE_PATHS.includes(location.pathname) && !isRestored.current) {
        const savedScroll = sessionStorage.getItem("carlist-scroll");
        if (savedScroll) {
          const y = parseInt(savedScroll, 10);
          setTimeout(() => {
            scroller.scrollTo({ top: y, left: 0, behavior: "auto" });
            isRestored.current = true;
          }, 100);
        }
      }
    } else if (navType === "PUSH" || navType === "REPLACE") {
      // NEW navigation - check if it's car-to-car navigation
      const isCarToCarNav = sessionStorage.getItem('car-details-scroll');
      
      if (isCarToCarNav) {
        // Car-to-car navigation - DON'T scroll to top, let CarDetails handle it
        isRestored.current = true;
      } else if (location.pathname !== lastPath.current) {
        // Regular new page navigation - scroll to top
        scroller.scrollTo({ top: 0, left: 0, behavior: "auto" });
        isRestored.current = false;
      }
    }

    lastPath.current = location.pathname;

    return () => {
      scroller.removeEventListener("scroll", saveScrollPosition);
    };
  }, [location, navType]);

  // Handle page refresh - always scroll to top
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Clear any scroll positions on refresh
      sessionStorage.removeItem("carlist-scroll");
      sessionStorage.removeItem("car-details-scroll");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // On component mount, check if it's a refresh and scroll to top
  useEffect(() => {
    const scroller = getScroller();
    if (!scroller) return;

    // Check if page was refreshed
    const isRefresh = performance.navigation?.type === 1 || 
                     performance.getEntriesByType("navigation")[0]?.type === "reload";
    
    if (isRefresh) {
      // Page was refreshed - scroll to top
      scroller.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, []);

  return null;
}