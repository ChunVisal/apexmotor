import { Link, useLocation } from "react-router-dom";
import { FaChevronRight, FaHome } from "react-icons/fa";

const Breadcrumbs = ({ carName }) => {
  const location = useLocation();
  // Split path and remove empty strings
  const pathnames = location.pathname.split("/").filter((x) => x);

  const nameMap = {
    profile: "Profile",
    "edit-profile": "Edit Profile",
    sellcar: "Sell a Car",
    wishlist: "Wishlist",
    cart: "Cart",
    cars: "Cars",
  };

  return (
    <nav className="flex items-center text-sm font-medium text-gray-500 my-4 space-x-2">
      {/* Home Link is always first */}
      <Link
        to="/"
        className="flex items-center gap-1 text-[#2384C1] hover:text-blue-700 transition-colors"
      >
        <FaHome size={15} /> Home
      </Link>

      {pathnames.map((value, index) => {
        const isLast = index === pathnames.length - 1;
        
        // Dynamically build the route path (e.g., /cars or /profile/settings)
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;

        // Determine the display name
        let name;
        if (isLast && carName) {
          name = carName;
        } else {
          name = nameMap[value] || value.charAt(0).toUpperCase() + value.slice(1);
        }

        return (
          <div key={routeTo} className="flex items-center space-x-2">
            <FaChevronRight className="h-3 w-3 text-gray-400" />
            
            {isLast ? (
              // Last item is just text, not a link
              <span className="text-gray-600 font-semibold">{name}</span>
            ) : (
              // Previous items are clickable links
              <Link 
                to={routeTo} 
                className="text-[#2384C1] hover:text-blue-700 transition-colors"
              >
                {name}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;