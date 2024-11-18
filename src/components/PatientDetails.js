import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PatientDetails = () => {
  const { registrationId } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get("http://41.188.172.204:30003/patients", {
          params: { Registration_ID: registrationId },
        });
        const fetchedPatient = response.data?.data?.[0] || null; 
        setPatient(fetchedPatient);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, [registrationId]);

  if (loading) return <p>Loading...</p>;
  if (!patient) return <p>No patient found.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Patient Details</h1>
      <p><strong>Patient Name:</strong> {patient.Patient_Name}</p>
      <p><strong>Patient Number:</strong> {patient.Registration_ID}</p>
      <p><strong>Guarantor Name:</strong> {patient.Guarantor_Name || "N/A"}</p>
      <p><strong>Date of Birth:</strong> {patient.Date_Of_Birth || "N/A"}</p>
      <p><strong>Region:</strong> {patient.Region || "N/A"}</p>
      <p><strong>Ward:</strong> {patient.Ward || "N/A"}</p>
      <p><strong>Country:</strong> {patient.Country || "N/A"}</p>
      <p><strong>Phone Number:</strong> {patient.Phone_Number || "N/A"}</p>
    </div>
  );
};

export default PatientDetails;
