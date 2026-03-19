// src/utils/SmartScroll.jsx
import { useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

// Get the scroll container element
function getScroller() {
  return document.getElementById("app-scroll") || document.scrollingElement || document.documentElement;
}

export default function SmartScroll({ ready }) {
  const location = useLocation();
  const navType = useNavigationType();
  const historyKey = location.key;

  const restored = useRef(false);

  useLayoutEffect(() => {
    const scroller = getScroller();
    if (!scroller) return;

    if (navType === "POP") {
      if (!ready) {
        console.log("[SmartScroll] Waiting for content to be ready...");
        return;
      }
      if (restored.current) return;

      const savedScroll = sessionStorage.getItem(`scroll:${historyKey}`);
      if (savedScroll) {
        const { x, y } = JSON.parse(savedScroll);
        scroller.scrollTo({ top: y, left: x, behavior: "auto" });
        console.log(`[SmartScroll] Restored scroll to (${x}, ${y}) for key: ${historyKey}`);
        restored.current = true;
      } else {
        scroller.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
    } else {
      scroller.scrollTo({ top: 0, left: 0, behavior: "auto" });
      restored.current = false;
      console.log("[SmartScroll] Scrolled to top for new route.");
    }

    return () => {
      if (scroller && !restored.current) {
        sessionStorage.setItem(
          `scroll:${historyKey}`,
          JSON.stringify({ x: scroller.scrollLeft, y: scroller.scrollTop })
        );
        console.log(`[SmartScroll] Saved scroll position for key: ${historyKey}`);
      }
    };
  }, [location.pathname, historyKey, navType, ready]);

  return null;
}