import React from "react";
import SearchResult from "../SearchResult/SearchResult";
import "./ResultsList.css";
import { useSelector } from "react-redux";
import {
  selectSearchResults,
  selectSearchStatus,
} from "../../features/Search/SearchSlice";
import LineLoading from "../LineLoading/LineLoading";
const ResultsList = () => {
  const status = useSelector(selectSearchStatus);
  const searchResults = useSelector(selectSearchResults);
  return (
    <>
      {status === "fulfilled" && (
        <div className="results-list">
          {searchResults.map((result) => {
            return <SearchResult result={result} />;
          })}
        </div>
      )}
      {status === "pending" && <LineLoading />}
    </>
  );
};

export default ResultsList;
