import React, { useState } from "react";

import { Answer } from "./components/Answer";
import { Loader } from "./components/Loader";
import "./App.css";

function App() {
  const [country, setCountry] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [gptAnswer, setGptAnswer] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);

    const response = await fetch("http://localhost:5001", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `What should I pack when going to ${country}?`,
      }),
    });

    if (response.ok) {
      const data = await response.json();

      setIsLoading(false);
      setGptAnswer(data.bot);
    } else {
      const err = await response.text();

      alert(err);
      setIsLoading(false);
    }
  }

  return (
    <>
      {!isLoading && !gptAnswer && (
        <form onSubmit={handleSubmit} className="wrapper">
          <div>
            <span className="label">What should I bring to</span>{" "}
            <input
              autoFocus
              className="input"
              type="text"
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
        </form>
      )}
      {gptAnswer && <Answer answer={gptAnswer} destination={country} />}
      {isLoading && <Loader />}

      <footer className="footer">
        <span>
          A ChatGPT powered assistant made by{" "}
          <a
            className="link"
            href="https://twitter.com/christo_kade"
            target="_blank"
          >
            Christopher
          </a>
        </span>
      </footer>
    </>
  );
}

export default App;
