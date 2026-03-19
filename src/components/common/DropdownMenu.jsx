import { useEffect, useRef } from "react";

export default function DropdownMenu({ isOpen, onClose, children }) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className="bg-white backdrop-blur-md bg-opacity-10 shadow-lg border-b border-white/20"
      ref={ref}
      style={{
        position: "absolute",
        top: "100%",
        right: 8,
        marginTop: 8,
        width: 192,
        WebkitBackdropFilter: "blur(50px)",
        backdropFilter: "blur(0px)",
        borderRadius: 8,
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        transformOrigin: "top",
        transform: isOpen ? "scaleY(1)" : "scaleY(0)",
        transition: "transform 0.3s ease-in-out",
        pointerEvents: isOpen ? "auto" : "none",
        zIndex: 1000,
      }}
    >
      {children}
    </div>
  );
}
