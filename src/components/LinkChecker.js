"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function LinkChecker() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    console.log(result);
  }, [result]);
  const checkLinks = async () => {
    try {
      const response = await axios.get(
        `/api/checkLinks?url=${encodeURIComponent(url)}`
      );
      console.log(response);
      setResult(response.data);
    } catch (e) {
      console.error("Error checking links:", e);
    }
  };
  return (
    <div>
      <div className="urlTextBox">
        <label htmlFor="url">
          Enter URL:
          <input
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        <button onClick={() => checkLinks()}>Check Links</button>
      </div>
      {result && (
        <div className="results">
          {result.map((obj, key) => (
            <li key={key}>{obj.link} {obj.status}</li>
          ))}
        </div>
      )}
    </div>
  );
}
