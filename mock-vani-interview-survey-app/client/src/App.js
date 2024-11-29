import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormPage from "./components/FormPage"; // Form submission page
import InsightsPage from "./components/InsightsPage"; // Insights page
import NavigationBar from "./components/NavigationBar"; // Navigation bar
import "./styles/NavigationBar.css"; // Styles for the navigation bar

function App() {
  return (
    <Router>
      <div>
        {/* Add Navigation Bar */}
        <NavigationBar />

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<FormPage />} />
          <Route path="/insights" element={<InsightsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
