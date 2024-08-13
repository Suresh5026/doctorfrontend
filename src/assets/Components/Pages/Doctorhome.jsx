import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { DoctorContext } from "../../Context/Doctorcontext";

export default function Doctorhome() {
  const { doctorId } = useContext(DoctorContext);
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
    if (!doctorId) return;

    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://doctorapp-45j4.onrender.com/appoint/getAppointmentsByDoctor/${doctorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAppointments(response.data.data || []); // Ensure appointments is always an array
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [doctorId]);

  const today = new Date().setHours(0, 0, 0, 0);

  const pendingAppointments = appointments.filter(
    (app) => {
      const appointmentDate = new Date(app.date).setHours(0, 0, 0, 0);
      app.status === "Approved" && appointmentDate >= today }
  );

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
          {pendingAppointments.length > 0 ? (
            pendingAppointments.map((appointment, index) => (
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
              <td colSpan={heading.length}>
                No Pending Appointments Available
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}
