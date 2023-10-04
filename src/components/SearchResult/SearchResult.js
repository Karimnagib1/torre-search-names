import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import "./SearchResult.css";
import { useNavigate } from "react-router-dom";
import { extractTokenFromCookie } from "../../utils/extractToken";

const SearchResult = ({ result }) => {
  const navigate = useNavigate();
  const handleResultClick = () => {
    window.open(`https://torre.ai/${result.username}`, "_blank");
  };
  const handleStarClick = async (e) => {
    e.stopPropagation();
    const token = extractTokenFromCookie();

    if (token) {
      const jsonResponse = await fetch(
        "https://torre-search-names.onrender.com/favorites/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(result),
        }
      );

      const response = await jsonResponse.json();
      if (response.status === 201) {
        console.log("Favorite added successfully");
      } else {
        console.log(response.message);
      }
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
