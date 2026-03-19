import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Button({ to, onClick, children, className = "", icon,  }) {
  const base = `
    flex items-center justify-center
    rounded-full font-medium
    transition duration-200 cursor-pointer
  `;
  
  const combinedClass = `${base} ${className}`.trim();

  const buttonContent = (
    <>
      {icon && <FontAwesomeIcon icon={icon} className="mr-2 h-3 w-3 sm:h-4 md:h-5" />}
      {children}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedClass}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedClass}>
      {buttonContent}
    </button>
  );
}
