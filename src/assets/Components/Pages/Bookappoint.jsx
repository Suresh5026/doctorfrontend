import { useLocation, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useContext,  useState } from "react";
import { UserContext } from "../../Context/Usercontext";

const generateTimeSlots = (fromTime, toTime, slotDuration = 30) => {
  const slots = [];
  const startTime = new Date(`1970-01-01T${fromTime}:00`);
  const endTime = new Date(`1970-01-01T${toTime}:00`);
  const slotDurationMs = slotDuration * 60 * 1000;

  let currentTime = startTime;

  while (currentTime < endTime) {
    const slotStart = new Date(currentTime);
    const slotEnd = new Date(currentTime.getTime() + slotDurationMs);
    slots.push({
      start: slotStart.toTimeString().slice(0, 5),
      end: slotEnd.toTimeString().slice(0, 5),
    });
    currentTime = new Date(slotEnd);
  }

  return slots;
};

export default function Bookappoint() {
  const { name, userId } = useContext(UserContext);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { doctor } = state;
  const [bookedSlots, setBookedSlots] = useState([]);

  const today = new Date().toISOString().split("T")[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 7);

  const handleBack = () => {
    navigate("/home");
  };

  const timeSlots = generateTimeSlots(doctor.fromTiming, doctor.toTiming);

  const fetchBookedSlots = async (date) => {
    try {
      const response = await axios.get(
        `https://doctorapp-45j4.onrender.com/appoint/getAppointmentsByDoctor/${doctor._id}?date=${date}`
      );
      const booked = response.data.data.map((appointment) => ({
        start: appointment.bookfromtime,
        end: appointment.booktotime,
      }));
      setBookedSlots(booked);
    } catch (error) {
      console.error("Error fetching booked slots:", error);
    }
  };

  const isSlotBooked = (slot) => {
    return bookedSlots.some(
      (booked) => booked.start === slot.start && booked.end === slot.end
    );
  };

  return (
    <>
      <Card
        style={{ width: "24rem", margin: "auto", background: "lightblue" }}
        className="bookingCard mt-5"
      >
        <Card.Body>
          <Card.Title>Book Appointment</Card.Title>
          <Card.Text>Patient Name: {name}</Card.Text>
          <Card.Text>
            Doctor Name: {doctor.firstname} {doctor.lastname}
          </Card.Text>
          <Card.Text>Specialization: {doctor.spe}</Card.Text>
          <Card.Text>Fees: Rs. {doctor.fees}</Card.Text>
          <Formik
            initialValues={{
              date: "",
              timeSlot: "",
            }}
            validate={(values) => {
              const errors = {};
              const selectedDate = new Date(values.date);
              selectedDate.setHours(0, 0, 0, 0); // Clear time for comparison

              const minDate = new Date();
              minDate.setHours(0, 0, 0, 0);

              const maxDateCopy = new Date(maxDate);
              maxDateCopy.setHours(0, 0, 0, 0);

              if (!values.date) {
                errors.date = "Required";
              } else if (selectedDate < minDate || selectedDate > maxDateCopy) {
                errors.date = "Date must be within the next 7 days";
              }

              if (!values.timeSlot) {
                errors.timeSlot = "Required";
              }

              return errors;
            }}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              try {
                const [bookfromtime, booktotime] = values.timeSlot.split("-");
                const token = localStorage.getItem("token");

                await axios.post(
                  "https://doctorapp-45j4.onrender.com/appoint/createAppointment",
                  {
                    doctorId: doctor._id,
                    patientId: userId,
                    date: values.date,
                    bookfromtime,
                    booktotime,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );

                alert("Appointment booked successfully");
                resetForm();
              } catch (error) {
                console.error("Error booking appointment:", error);
                alert("Error booking appointment");
              }
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="date">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={values.date}
                    min={today}
                    max={maxDate.toISOString().split("T")[0]}
                    onChange={async (e) => {
                      const date = e.target.value;
                      setFieldValue("date", date);
                      await fetchBookedSlots(date);
                    }}
                    onBlur={handleBlur}
                  />
                  {touched.date && errors.date && (
                    <div style={{ color: "red" }}>{errors.date}</div>
                  )}
                </Form.Group>
                <Form.Group controlId="timeSlot">
                  <Form.Label>Select Time Slot</Form.Label>
                  <Form.Control
                    as="select"
                    name="timeSlot"
                    value={values.timeSlot}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">Select a time slot</option>
                    {timeSlots.map((slot, index) => (
                      <option
                        key={index}
                        value={`${slot.start}-${slot.end}`}
                        disabled={isSlotBooked(slot)}
                      >
                        {slot.start} - {slot.end}{" "}
                        {isSlotBooked(slot) ? "(Booked)" : ""}
                      </option>
                    ))}
                  </Form.Control>
                  {touched.timeSlot && errors.timeSlot && (
                    <div style={{ color: "red" }}>{errors.timeSlot}</div>
                  )}
                </Form.Group>
                <br />
                <div>
                  <Button
                    variant="info"
                    type="submit"
                    disabled={isSubmitting}
                    className="me-2"
                  >
                    Book Your Appointment
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleBack}
                    disabled={isSubmitting}
                  >
                    Back
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </>
  );
}
