import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  CircularProgress,
  Box,
  CssBaseline,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

const PatientDetails = () => {
  const { registrationId } = useParams();
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://41.188.172.204:30003/patients");
        const fetchedPatients = response.data?.data?.data || [];
        setPatients(fetchedPatients);

        const selectedPatient = fetchedPatients.find(
          (p) => p.Registration_ID === registrationId
        );
        setPatient(selectedPatient || null);
      } catch (error) {
        console.error("Error fetching patients:", error);
        setPatient(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [registrationId]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <AppBar position="static" sx={{ marginBottom: 2 }}>
        <Toolbar>
          <Typography variant="h6">Patient Details</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        {loading ? (

          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
            <CircularProgress />
          </Box>
        ) : patient ? (
          <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table sx={{ minWidth: 800 }} aria-label="patient details table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", backgroundColor: "teal", color: "white" }}>
                    Field
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", backgroundColor: "teal", color: "white" }}>
                    Details
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Patient Name</TableCell>
                  <TableCell>{patient.Patient_Name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Registration ID</TableCell>
                  <TableCell>{patient.Registration_ID}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Guarantor Name</TableCell>
                  <TableCell>{patient.Guarantor_Name || "N/A"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Date of Birth</TableCell>
                  <TableCell>{patient.Date_Of_Birth || "N/A"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Region</TableCell>
                  <TableCell>{patient.Region || "N/A"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Ward</TableCell>
                  <TableCell>{patient.Ward || "N/A"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Country</TableCell>
                  <TableCell>{patient.Country || "N/A"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>{patient.Phone_Number || "N/A"}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography
            variant="h6"
            sx={{ textAlign: "center", marginTop: 4, color: "gray" }}
          >
            No patient found with Registration ID {registrationId}.
          </Typography>
        )}
      </Container>
      <Box
        sx={{
          marginTop: "auto",
          backgroundColor: "black",
          padding: "10px 0",
          textAlign: "center",
        }}
      >
        <Typography variant="body2" color="white">
          &copy; 2024 GPITG Test
        </Typography>
      </Box>
    </Box>
  );
};

export default PatientDetails;
