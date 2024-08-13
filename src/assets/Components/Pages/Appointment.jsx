import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Table, Modal, Card } from "react-bootstrap";
import { UserContext } from "../../Context/Usercontext";


export default function Appointment() {
  const { userId } = useContext(UserContext);
  const heading = [
    "S.No",
    "Doctor Name",
    "Doctor Id",
    "Patient Name",
    "Doctor Fees",
    "Date",
    "Time",
    "Action",
  ];

  const [appoint, setAppoint] = useState([]);
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchBooking = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/appoint/getappointment/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const appointments = response.data.appointments;
        console.log(appointments);
        setAppoint(appointments);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };
    if (token) {
      fetchBooking();
    }
  }, [userId]);

  const handleDelete = async (appointmentId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:8000/appoint/deleteBooking/${appointmentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAppoint(appoint.filter((app) => app._id !== appointmentId));
    } catch (error) {
      console.log("Error deleting appointment:", error);
    }
  };

  const handleOpenRazropay = (data, appointmentId) => {
    const options = {
      key: "rzp_test_tGoWeh9ybvAQtC",
      amount: Number(data.amount),
      currency: "INR",
      name: "Doctor Appointment App",
      order_id: data.id,
      notes: {
        appointmentId: appointmentId,
        userId: userId,
      },
      handler: function (response) {
        console.log(response);
        axios
          .post("http://localhost:8000/pay/verify", {
            response: response,
            appointmentId: appointmentId,
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handlePayment = (amount, appointmentId) => {
    const data = {
      amount: amount,
      userId: userId,
      appointmentId: appointmentId,
    };
    axios
      .post("http://localhost:8000/pay/orders", data)
      .then((res) => {
        console.log("68", res.data.data);
        handleOpenRazropay(res.data.data, appointmentId);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <h1>Your Appointments</h1>
      <br />
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            {heading.map((head, index) => (
              <th key={index}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {appoint.map((element, index) => (
            <tr>
              <td key={`${index}-${element._id}`}>{index + 1}</td>
              <td>{element.doctorName}</td>
              <td>{element.patientName}</td>
              <td>{element.doctorFees}</td>
              <td>{new Date(element.date).toLocaleDateString()}</td>
              <td>
                {element.bookfromtime} AM to {element.booktotime} PM
              </td>

              <td>
                {element.status === "Pending" || element.status === 'Rejected'  ? (
                 <>
                  <td>{element.status}</td>
                  <Button onClick={() => handleDelete(element._id)}>
                    Delete
                  </Button>
                 </>
                ) : (
                  <td>{element.status}</td>
                )}
              </td>
              <td>
                {element.paymentStatus !== "Paid" &&
                element.paymentStatus === "Failed" ? (
                  <Button
                    onClick={() =>
                      handlePayment(element.doctorFees, element._id)
                    }
                  >
                    Pay Fees
                  </Button>
                ) : (
                  <td>{element.paymentStatus}</td>
                )}
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
