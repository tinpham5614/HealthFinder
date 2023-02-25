import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function ResultsArea({
  resources,
  results,
  totalResults,
  isLoading,
  relatives
}) {
  if (isLoading) {
    return <FontAwesomeIcon icon={faSpinner} size="2x" spin />;
  } else if (resources.length === 0) {
    resources = <p>No resources found.</p>;
  } else {
    const resourceElements = [];
    const relativeElements = [];
    resources.forEach((resource) => {
      // Check duplicated Id
      const existingResource = resourceElements.find(
        (srcId) => srcId.key === resource.Id
      );
      // If it doesn't exist, add it to the array
      if (!existingResource) {
        resourceElements.push(
          <div key={resource.Id} className="result">
            <h2>{resource.Title}</h2>
            <p>{resource.Categories}</p>
            {resource.ImageUrl && (
              <img src={resource.ImageUrl} alt={resource.ImageAlt} />
            )}
            <div>
              {resource.AccessibleVersion && (
                <a
                  href={resource.AccessibleVersion}
                  target="_blank"
                  rel="noreferrer"
                >
                  Learn more...
                </a>
              )}
            </div>
          </div>
        );
      }
    });
    relatives.forEach((relative) => {
      relativeElements.push(
        <div className="result-relative" key={relative.Id}>
          {relative.Url && (
            <a href={relative.Url} target="_blank" rel="noreferrer">
              <p>{relative.Title}</p>
            </a>
          )}
        </div>
      );
    });
    return (
      <div className="results-area">
        {totalResults && (
          <p className="results-count">
            Showing {resourceElements.length} resources.
          </p>
        )}
        <p className="result-heading">{results.MyHFHeading}</p>
        {resourceElements}
        <h3 className="relative-header">Related Topics: </h3>
        {relativeElements}
      </div>
    );
  }
}

export default ResultsArea;
