import { React } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faStar } from "@fortawesome/free-solid-svg-icons";

import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  selectIsAuthenticated,
  logout,
} from "../../features/Auth/UserSlice.js";
import axios from "axios";
import "./NavBar.css";

const NavBar = ({ path }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  let currentTab = "search";
  const handleLinkClick = async (e) => {
    if (currentTab === e.currentTarget.id) {
      return;
    }
    currentTab = e.currentTarget.id;
    let nav = document.getElementById("main-nav");
    let links = nav.getElementsByClassName("nav-item");
    for (let i = 0; i < links.length; i++) {
      if (currentTab === links[i].id) {
        links[i].classList.add("active");
      } else {
        links[i].classList.remove("active");
      }
    }
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear the cookie
    document.cookie =
      "Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Remove Authorization header
    delete axios.defaults.headers.common["Authorization"];
    navigate("/");
    dispatch(logout());
  };

  return (
    <div className="nav-container">
      <ul className="nav" id="main-nav">
        <Link to="/">
          <li
            className={path === "search" ? "nav-item active" : "nav-item"}
            onClick={handleLinkClick}
            id="search"
          >
            <FontAwesomeIcon
              className="nav-link  mt-2 search"
              icon={faMagnifyingGlass}
            />
            Search
          </li>
        </Link>
        <Link to="/favorites">
          <li
            className={path === "favorites" ? "nav-item active" : "nav-item"}
            onClick={handleLinkClick}
            id="favorites"
          >
            <FontAwesomeIcon className="nav-link mt-2 " icon={faStar} />
            Favorites
          </li>
        </Link>
      </ul>

      {isAuthenticated ? (
        <button id="logout" onClick={handleLogout}>
          {" "}
          logout
        </button>
      ) : (
        <Link to="/auth">
          <button id="signup"> signup</button>
        </Link>
      )}
    </div>
  );
};

export default NavBar;
