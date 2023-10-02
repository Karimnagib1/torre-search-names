import React from "react";
import SearchResult from "../SearchResult/SearchResult";
import "./ResultsList.css";
import { useSelector } from "react-redux";
import {
  selectSearchResults,
  selectSearchStatus,
} from "../../features/Search/SearchSlice";
const ResultsList = () => {
  const status = useSelector(selectSearchStatus);
  const searchResults = useSelector(selectSearchResults);
  return (
    <div className="results-list">
      {status === "fulfilled" &&
        searchResults.map((result) => {
          return <SearchResult result={result} />;
        })}
    </div>
  );
};

export default ResultsList;
