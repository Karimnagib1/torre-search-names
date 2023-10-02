import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import "./SearchResult.css";

const SearchResult = ({ result }) => {
  return (
    <div className="search-result-container">
      <div className="search-result-content">
        <div className="image-container">
          <img src={result.imageUrl || "person-icon.png"} alt="person" />
        </div>
        <div className="content-container">
          <h3 className="name">{result.name}</h3>
          <p className="job-title">{result.professionalHeadline}</p>
        </div>
        <FontAwesomeIcon className="star" icon={faStar} />
      </div>
    </div>
  );
};

export default SearchResult;
