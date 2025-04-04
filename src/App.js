import React, { useState } from "react";
import axios from "axios";

function App() {
  const [matchSummary, setMatchSummary] = useState("");
  const [response, setResponse] = useState("");

  const handleGenerate = async () => {
    try {
      const res = await axios.post("http://localhost:5000/generate", {
        matchSummary: matchSummary,
      });

      const generatedText =
        res.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response received";
      setResponse(generatedText);
    } catch (error) {
      console.error(
        "Error generating text:",
        error.response ? error.response.data : error.message
      );
      setResponse("Error fetching response.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Cricket Match History AI</h1>
      <textarea
        rows="4"
        cols="50"
        value={matchSummary}
        onChange={(e) => setMatchSummary(e.target.value)}
        placeholder="Enter match details..."
        style={{ padding: "10px", width: "80%", marginBottom: "10px" }}
      />
      <br />
      <button onClick={handleGenerate} style={{ padding: "10px 20px" }}>
        Generate Summary
      </button>
      <div
        style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}
      >
        <h3>AI-Generated Summary:</h3>
        <p>{response ? response : "No response yet."}</p>
      </div>
    </div>
  );
}

export default App;
