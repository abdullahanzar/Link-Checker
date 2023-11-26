"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./linkChecker.module.css";

export default function LinkChecker() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const checkLinks = async () => {
    if (url == "") return setError("Please enter a link in the textbox!");
    else {
      setError("");
      setResult(null);
    }
    try {
      setLoading(true);
      const response = await axios.get(
        `/api/checkLinks?url=${encodeURIComponent(url)}`
      );
      console.log(response);
      setResult(response.data);
      setLoading(false);
    } catch (e) {
      //console.error("Error checking links:", e);
      setError("Main link is not working!");
      setLoading(false);
    }
  };
  return (
    <div className={styles.mainbody}>
      <div className={styles.urlTextBox}>
        <h1> &#x1F50D; Broken Link Checker </h1>
        <input
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter your link here!"
        />
        <button onClick={() => checkLinks()}>Check Links</button>
        {loading && <span class={styles.loader}></span>}
        {error && <span class={styles.error}>{error}</span>}
      </div>
      {
        <div className={styles.results}>
          {result !== null && result !== undefined && result.length !== 0 && (
            <p>
              Main link is <span className={styles.ok}>working</span>, sublinks
              on the page are:
            </p>
          )}
          {result !== null && result !== undefined && result.length === 0 && (
            <p>
              Main link is <span className={styles.ok}>working</span>, there are
              &nbsp;
              <span className={styles.broken}>
                no sublinks detected on the page.
              </span>
            </p>
          )}
          <ul>
            {result &&
              result.map((obj, key) => (
                <li key={key}>
                  <a href={obj.link}>{obj.link}</a>
                  <p>
                    Status:{" "}
                    <span
                      className={obj.status == "ok" ? styles.ok : styles.broken}
                    >
                      {obj.status}
                    </span>
                  </p>
                </li>
              ))}
          </ul>
        </div>
      }
    </div>
  );
}
