// src/utils/SmartScroll.jsx
import { useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

function getScroller() {
  return document.getElementById("app-scroll") || document.scrollingElement || document.documentElement;
}

export default function SmartScroll({ restoreKey }) {
  const location = useLocation();
  const navType = useNavigationType();

  if (location.pathname === "/" || location.pathname.startsWith("/cars")) {
    return null;
  }

  useLayoutEffect(() => {
    const scroller = getScroller();
    if (!scroller) return;
    const key = restoreKey || `scroll:${location.pathname}`;

    if (navType === "POP") {
      const saved = sessionStorage.getItem(key);
      if (saved) {
        try {
          const { x = 0, y = 0 } = JSON.parse(saved);
          scroller.scrollTo({ left: x, top: y, behavior: "auto" });
        } catch {}
      }
    } else {
      scroller.scrollTo({ left: 0, top: 0, behavior: "auto" });
    }

    return () => {
      sessionStorage.setItem(key, JSON.stringify({ x: scroller.scrollLeft, y: scroller.scrollTop }));
    };
  }, [location, navType, restoreKey]);

  return null;
}