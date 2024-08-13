import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { DoctorContext } from "../Context/Doctorcontext";

export default function Doctorapproval() {
  const { doctorId } = useContext(DoctorContext);
  const [appointments, setAppointments] = useState([]);
  
  const heading = [
    "S.No",
    "Patient Name",
    "Date of Appointment",
    "From Time",
    "To Time",
    "Status",
    "Action"
  ];

  useEffect(() => {
    if (!doctorId) return;

    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8000/appoint/getAppointmentsByDoctor/${doctorId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAppointments(response.data.data || []); // Ensure appointments is always an array
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [doctorId]);

  const handleApproval = async (appointmentId, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8000/appoint/approveBooking/${doctorId}`, {
        appointmentId,
        status
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAppointments(prev =>
        prev.map(app => app._id === appointmentId ? { ...app, status } : app)
      );
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  const pendingAppointments = appointments.filter(app => app.status === "Pending");

  return (
    <>
      <h1>Hi Doctor</h1>
      <Table responsive>
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
                <td>
                  {appointment.status === "Pending" ? (
                    <>
                      <Button onClick={() => handleApproval(appointment._id, 'Approved')}>Approve</Button>
                      <Button onClick={() => handleApproval(appointment._id, 'Rejected')}>Reject</Button>
                      </>
                    
                  ) : (
                   ""
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={heading.length}>No Pending Appointments Available</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}
