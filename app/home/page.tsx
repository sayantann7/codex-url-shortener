"use client";
import React from "react";
import { useState } from "react";

function Home() {
  const [url, setUrl] = useState("");
  const [shorturl, setShortUrl] = useState("");
  const [generated, setGenerated] = useState("");
  const generate = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      url: url,
      shorturl: shorturl,
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/api/shorten", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setGenerated(`http://localhost:3000/${shorturl}`);
        setShortUrl("");
        setUrl("");
        alert(result.message);
      })
      .catch((error) => console.error(error));
  };

  const copyToClipboard = () => {
    if (generated) {
      navigator.clipboard.writeText(generated).then(() => {
        alert('Copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-7">
      <h1 className="text-6xl">Welcome to my URL Shortener</h1>
      <div className="flex flex-col space-y-4">
        <input
          onChange={(e) => {
            setUrl(e.target.value);
          }}
          value={url}
          name="url"
          type="text"
          className="p-2 border border-gray-300 rounded-lg"
          placeholder="Enter your URL"
        />
        <input
          onChange={(e) => {
            setShortUrl(e.target.value);
          }}
          value={shorturl}
          type="text"
          className="p-2 border border-gray-300 rounded-lg"
          placeholder="Enter your Short URL"
        />
        <button
          onClick={generate}
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Shorten
        </button>
        {generated && <h1>Your Short URL: {generated}</h1>}

        {generated && (
                  <button onClick={copyToClipboard} className="w-full mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Copy Link
                  </button>
              )}
      </div>
    </div>
  );
}

export default Home;
