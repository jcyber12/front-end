import React, { useState, useEffect } from "react";
import {AppBar,Toolbar,Typography,Container,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,TablePagination,CircularProgress,Box,CssBaseline,} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://41.188.172.204:30003/patients");
        console.log(response.data);
        const fetchedPatients = response.data?.data?.data || []; 
        setPatients(Array.isArray(fetchedPatients) ? fetchedPatients : []);
      } catch (error) {
        console.error("Error fetching  data:", error);
        setPatients([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleRowClick = (registrationId) => {
    navigate(`/patient/${registrationId}`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <AppBar position="static" sx={{ marginBottom: 2 }}>
        <Toolbar>
          <Typography variant="h6">Patients Details</Typography>
        </Toolbar>
      </AppBar>


      <Container maxWidth="false" marginTop="120" sx={{ paddingX: { xs: 2, md: 4 } }} >

        <TableContainer component={Paper} >
          <Table sx={{ minWidth: 800 }} aria-label="patients table">
            <TableHead>
              <TableRow>
                <TableCell>S/N</TableCell>
                <TableCell>Patient Name</TableCell>
                <TableCell>Registration ID</TableCell>
                <TableCell>Guarantor Name</TableCell>
                <TableCell>Date of Birth</TableCell>
                <TableCell>Region</TableCell>
                <TableCell>Ward</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} sx={{ textAlign: "center" }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : patients.length > 0 ? (
                patients
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((patient, index) => (
                    <TableRow
                      key={patient.Registration_ID}
                      onClick={() => handleRowClick(patient.Registration_ID)}
                      sx={{
                        cursor: "pointer",
                        "&:hover": { backgroundColor: "#f5f5f5" },
                      }}
                    >
                      <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                      <TableCell>{patient.Patient_Name}</TableCell>
                      <TableCell>{patient.Registration_ID}</TableCell>
                      <TableCell>{patient.Guarantor_Name || "CASH"}</TableCell>
                      <TableCell>{patient.Date_Of_Birth || "N/A"}</TableCell>
                      <TableCell>{patient.Region || "N/A"}</TableCell>
                      <TableCell>{patient.Ward || "N/A"}</TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} sx={{ textAlign: "center" }}>
                    No patients found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={patients.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
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

export default Patients;
