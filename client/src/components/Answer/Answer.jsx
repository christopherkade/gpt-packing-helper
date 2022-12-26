import React, { useState, useEffect } from "react";
import "./Answer.css";

const Answer = ({ answer, destination }) => {
  const [items, setItems] = useState([]);
  const [cleanedDestination, setCleanedDestination] = useState(destination);

  useEffect(() => {
    const list = answer.split("\n");

    setItems(
      list.map((element) => {
        console.log(element);
        return element.trim().substring(2);
      })
    );

    setCleanedDestination((prev) => prev.split("?")[0]);
  }, []);
  return (
    <div className="answer-wrapper">
      <h1 className="answer-title">
        Things you should bring to {cleanedDestination}
      </h1>
      {items &&
        items.map(
          (item) =>
            item && (
              <span className="item">
                <input type="checkbox" /> {item}
              </span>
            )
        )}
    </div>
  );
};

export default Answer;
