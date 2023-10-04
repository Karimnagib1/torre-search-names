import { React } from "react";
import "./Search.css";
import NavBar from "../../components/NavBar/NavBar";
import ResultsList from "../../components/ResultsList/ResultsList";

import { getSearchResults } from "./SearchSlice";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";

const Search = () => {
  const dispatch = useDispatch();

  // To wait until the user finishes typings
  const debouncedSearch = debounce((searchTerm) => {
    dispatch(getSearchResults(searchTerm));
  }, 300);

  const handleTermChange = (e) => {
    debouncedSearch(e.target.value);
  };

  return (
    <>
      <NavBar path="search" />
      <div className="search-container">
        <div className="input-wrapper">
          <ResultsList />
          <button className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              height="25px"
              width="25px"
            >
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="1.5"
                stroke="#fff"
                d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
              ></path>
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="1.5"
                stroke="#fff"
                d="M22 22L20 20"
              ></path>
            </svg>
          </button>
          <input
            placeholder="search.."
            className="input"
            name="text"
            type="text"
            onChange={handleTermChange}
          />
        </div>
      </div>
    </>
  );
};

export default Search;
