import { React } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faStar } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../features/Auth/UserSlice.js";
import "./NavBar.css";

const NavBar = () => {
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

  return (
    <div className="nav-container">
      <ul className="nav" id="main-nav">
        <Link to="/">
          <li className="nav-item" onClick={handleLinkClick} id="search">
            <FontAwesomeIcon
              className="nav-link  mt-2 search"
              icon={faMagnifyingGlass}
            />
            Search
          </li>
        </Link>
        <Link to="/">
          <li className="nav-item" onClick={handleLinkClick} id="favorites">
            <FontAwesomeIcon className="nav-link mt-2 " icon={faStar} />
            Favorites
          </li>
        </Link>
      </ul>

      {isAuthenticated ? (
        <button id="logout"> logout</button>
      ) : (
        <Link to="/auth">
          <button id="signup"> signup</button>
        </Link>
      )}
    </div>
  );
};

export default NavBar;
