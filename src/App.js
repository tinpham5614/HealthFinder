import React, { useState } from "react";
import SearchArea from "./components/SearchArea";
import ResultsArea from "./components/ResultsArea";
import "./styles.css";
import "./responsive.css";


export default function App() {
  const [resources, setResources] = useState([]);
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [relatives, setRelatives] = useState([]);

  const handleSearch = (age, sex) => {
    setIsLoading(true);
    fetch(
      `https://health.gov/myhealthfinder/api/v3/myhealthfinder.json?lang=en&age=${age}&sex=${sex}`
    )
      .then((response) => response.json())
      .then((data) => {
        setResources(data.Result.Resources.all.Resource);
        setResults(data.Result);
        setTotalResults(data.Result.Total);
        setIsLoading(false);
        setRelatives(
          data.Result.Resources.all.Resource[0].RelatedItems.RelatedItem
        );
        console.log(
          data.Result.Resources.all.Resource[0].RelatedItems.RelatedItem
        );
      })
      .catch((error) => {
        console.error("Failed fetching...", error);
        setIsLoading(false);
      });
  };

  return (
    <div className="App">
      <h1 className="app-title">Health Finder</h1>
      <p>
        The MyHealthfinder recommendations come from the U.S. Preventive
        Services Task Force (USPSTF), the CDC Advisory Committee on Immunization
        Practices (ACIP), and the Health Resources and Services Administration
        (HRSA) as advised by organizations including the American Academy of
        Pediatrics (through the Bright Futures cooperative agreement) and the
        National Academies of Sciences, Engineering, and Medicine (formerly the
        Institute of Medicine). The Affordable Care Act requires most insurance
        plans to cover these preventive services at no cost to you.
      </p>{" "}
      <p>
        The MyHealthfinder tool is maintained by the Office of Disease
        Prevention and Health Promotion (ODPHP) in collaboration with the Agency
        for Healthcare Research and Quality (AHRQ).
      </p>
      <SearchArea onSearch={handleSearch} />
      <ResultsArea
        resources={resources}
        results={results}
        totalResults={totalResults}
        isLoading={isLoading}
        relatives={relatives}
      />
    </div>
  );
}
