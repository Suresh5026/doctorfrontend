import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

export default function Doctorhome() {
  const [doctorId, setDoctorId] = useState(null);
  const [appointments, setAppointments] = useState([]);

  const heading = [
    "S.No",
    "Patient Name",
    "Date of Appointment",
    "From Time",
    "To Time",
    "Status",
  ];

  useEffect(() => {
    const fetchDoctorIdByEmail = async () => {
      try {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email"); // Assuming email is stored in local storage

        if (!email) {
          console.error("Doctor email not found in local storage.");
          return;
        }

        const response = await axios.get(`http://localhost:8000/doctor/getDoctorByEmail/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`, // If using authentication
          },
        });
        console.log(response.data.data);
        
        setDoctorId(response.data.doctorId);
      } catch (error) {
        console.error("Error fetching doctor ID by email:", error);
      }
    };
    fetchDoctorIdByEmail();
  }, []);


  useEffect(() => {
    if (!doctorId) return;

    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8000/appoint/getAppointmentsByDoctor/${doctorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAppointments(response.data.data || []);
        console.log(response.data.data);
        
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [doctorId]);

  return (
    <>
      <h1>Hi Doctor</h1>
      <Table responsive striped bordered hover variant="dark">
        <thead>
          <tr>
            {heading.map((head, index) => (
              <th key={index}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((appointment, index) => (
              <tr key={appointment._id}>
                <td>{index + 1}</td>
                <td>{appointment.patientName}</td>
                <td>{new Date(appointment.date).toLocaleDateString()}</td>
                <td>{appointment.bookfromtime}</td>
                <td>{appointment.booktotime}</td>
                <td>{appointment.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={heading.length}>No Appointments Available</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}
