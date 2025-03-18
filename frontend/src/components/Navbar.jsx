import { useState, useEffect } from "react";
import Logo from "./Logo";
import logout from "../assets/logout.png";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPlus,
  faCompass,
  faBookmark,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_REACT_API_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const navLinks = [
    { path: "/new", icon: faPlus, label: "Create" },
    { path: "/recipes", icon: faCompass, label: "Explore" },
    { path: "/saved", icon: faBookmark, label: "Saved" },
    { path: "/feed", icon: faHome, label: "Feed" },
  ];

  return (
    <motion.div
      className={`Navbar ${scrolled ? "scrolled" : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Logo></Logo>
      <div className={`links`}>
        <div className="linkk">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`link ${
                location.pathname === link.path ? "active" : ""
              }`}
            >
              <motion.div
                className="link-content"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <FontAwesomeIcon icon={link.icon} className="nav-icon" />
                <span>{link.label}</span>
                {location.pathname === link.path && (
                  <motion.div
                    className="underline"
                    layoutId="underline"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>
            </Link>
          ))}
        </div>
        <div className="sandp">
          <Link
            to="/profile"
            className={`link profile-link ${
              location.pathname === "/profile" ? "active" : ""
            }`}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <FontAwesomeIcon icon={faUser} size="xl" />
            </motion.div>
          </Link>
          <motion.button
            className="logout"
            onClick={handleLogout}
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
          >
            <img
              src={logout || "/placeholder.svg"}
              className="logout-icon"
              alt="Logout"
            />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
