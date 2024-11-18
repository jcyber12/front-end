import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Patients from "./components/Patients";
import PatientDetails from "./components/PatientDetails";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Patients />} />
      <Route path="/patient/:registrationId" element={<PatientDetails />} />
    </Routes>
  </Router>
);

export default App;
