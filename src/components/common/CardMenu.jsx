// src/components/common/CardMenu.jsx
import { useState, useEffect } from "react";
import { User, Bookmark, BookmarkCheck, Flag, XCircle } from "lucide-react";
import { FaEllipsisV } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { saveOrder } from "../../utils/saveOrder";
import { ShareCarButton } from "../common/ShareProfile";

export default function CardMenu({ car }) {
  const [showMenu, setShowMenu] = useState(false);
  const { addToCart, removeFromCart, isInCart } = useCart(); // ✅ include isInCart
  const { user, profile } = useAuth();

  const closeMenu = () => setShowMenu(false);
  const carId = car.id || car._id;

  useEffect(() => {
    document.body.style.overflow = showMenu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showMenu]);

  const toggleSave = async () => {
    if (!user) {
      alert("🛑 Please login to save items!");
      return;
    }
    if (!car?.id) {
      console.error("❌ Car has no ID!", car);
      return;
    }

    if (isInCart(car.id)) {
      removeFromCart(car.id);
    } else {
      addToCart(car);

      const orderData = {
        carId: car.id,
        brand: car.brand ?? "unknown",
        image: car.image ?? "",
        model: car.model ?? "unknown",
        name: car.name ?? "unknown",
        price: car.price ?? 0,
      };
      await saveOrder(orderData, user);
    }
    closeMenu();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="cursor-pointer rounded-full bg-white p-2 shadow hover:bg-gray-100"
      >
        <FaEllipsisV className="text-xs text-gray-600" />
      </button>

      {showMenu && (
        <>
          <div className="fixed inset-0 z-40 bg-black/50" onClick={closeMenu} />
          <div className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-xs -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-white shadow-xl">
            <ul className="py-1.5 text-sm text-gray-800">
              <li>
                <Link to={`/public-profile/${car.userId}`}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50"
                >
                  <User size={20} className="text-gray-600" />
                  <span>View Profile</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={toggleSave}
                  className="flex w-full items-center gap-3 px-4 py-2.5 hover:bg-gray-50"
                >
                  {isInCart(car?.id) ? (
                    <BookmarkCheck size={20} className="text-blue-600" />
                  ) : (
                    <Bookmark size={20} className="text-gray-600" />
                  )}
                  <span>{isInCart(car?.id) ? "Remove from Cart" : "Save to Cart"}</span>
                </button>
              </li>
              <ShareCarButton userId={car.userId} carId={car.id || car._id} />
              <li>
                <button
                  onClick={closeMenu}
                  className="flex w-full items-center gap-3 px-4 py-2.5 hover:bg-gray-50"
                >
                  <Flag size={20} className="text-gray-600" />
                  <span>Report</span>
                </button>
              </li>
              <MenuItem
                icon={<XCircle size={20} />}
                onClick={closeMenu}
                className="border-t border-gray-100"
              >
                Cancel
              </MenuItem>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

function MenuItem({ icon, children, onClick, className = "" }) {
  return (
    <li>
      <button
        onClick={onClick}
        className={`flex w-full items-center gap-3 px-4 py-2.5 hover:bg-gray-50 ${className}`}
      >
        <span className="text-gray-600">{icon}</span>
        <span>{children}</span>
      </button>
    </li>
  );
}
