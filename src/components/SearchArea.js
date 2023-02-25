import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchArea({ onSearch }) {
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(age, sex);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleSexChange = (event) => {
    setSex(event.target.value);
  };

  return (
    <div className="search-area">
      <form className="search-form" onSubmit={handleSubmit}>
        <div>
          <label className="search-label">
            Age:
            <input
              className="search-input"
              type="number"
              placeholder="Enter age here..."
              value={age}
              onChange={handleAgeChange}
              min="0"
            />
          </label>
        </div>
        <div>
          <label className="search-label">
            Sex:
            <select
              value={sex}
              onChange={handleSexChange}
              className="search-input"
              required
            >
              <option value="select">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>

          <button className="search-button">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchArea;
