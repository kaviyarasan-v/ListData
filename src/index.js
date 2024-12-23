import React from "react";
import ReactDOM from "react-dom/client"; // Ensure you're using the correct import for React 18
import App from "./App";
import "./index.css"; // If you have global styles

const container = document.getElementById("root");

// Use React 18's createRoot method
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
