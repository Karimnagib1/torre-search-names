import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import "./SearchResult.css";

const SearchResult = () => {
  return (
    <div className="search-result-container">
      <div className="image-container">
        <img src="person-icon.png" alt="person" />
      </div>
      <div className="content-container">
        <h3 className="name">Name</h3>
        <p className="job-title">job title</p>
      </div>
      <FontAwesomeIcon className="star" icon={faStar} />
    </div>
  );
};



export default SearchResult;
