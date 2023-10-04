import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import "./SearchResult.css";
import { selectIsAuthenticated } from "../../features/Auth/UserSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchResult = ({ result }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const handleResultClick = () => {
    window.open(`https://torre.ai/${result.username}`, "_blank");
  };
  const handleStarClick = (e) => {
    e.stopPropagation();
    if (isAuthenticated) {
      axios.post("http://localhost:5000/favorites/", result).then((res) => {
        console.log(res);
      });
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="search-result-container" onClick={handleResultClick}>
      <div className="search-result-content">
        <div className="image-container">
          <img src={result.imageUrl || "person-icon.png"} alt="person" />
        </div>
        <div className="content-container">
          <h3 className="name">{result.name}</h3>
          <p className="job-title">{result.professionalHeadline}</p>
        </div>
        <FontAwesomeIcon
          className="star"
          icon={faStar}
          onClick={handleStarClick}
        />
      </div>
    </div>
  );
};

export default SearchResult;
