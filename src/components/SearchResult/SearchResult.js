import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import "./SearchResult.css";

const SearchResult = ({ result }) => {
  const handleResultClick = () => {
    window.open(`https://torre.ai/${result.username}`, "_blank");
  };
  const handleStarClick = (e) => {
    e.stopPropagation();
    console.log("Star Clicked");
  }

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
        <FontAwesomeIcon className="star" icon={faStar}  onClick = {handleStarClick}/>
      </div>
    </div>
  );
};

export default SearchResult;
