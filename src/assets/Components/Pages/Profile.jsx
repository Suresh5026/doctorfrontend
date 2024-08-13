import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../Context/Doctorcontext";
import axios from "axios";

export default function Profile() {
  const { doctorId } = useContext(DoctorContext);
  const [doctor, setDoctor] = useState([]);
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        if (!doctorId) return;

        const response = await axios.get(
          `http://localhost:8000/doctor/getDoctor/${doctorId}`
        );
        setDoctor(response.data.data);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  return (
    <>
      <Card className="mt-5">
        <Card.Header>
          <h1>
            {doctor.firstname} {doctor.lastname}
          </h1>
        </Card.Header>
        <Card.Body>
          <Card.Title>{doctor.spe}</Card.Title>
          <Card.Text></Card.Text>
          <Card.Text>Phone Number : {doctor.phonenumber}</Card.Text>
          <Card.Text>Email : {doctor.email}</Card.Text>
          <Card.Text>Address : {doctor.address}</Card.Text>
          <Card.Text>City : {doctor.city}</Card.Text>
          <Card.Text>Fees : {doctor.fees}</Card.Text>
          <Card.Text>
            Time : {doctor.fromTiming} AM - {doctor.toTiming} PM
          </Card.Text>

          <Button variant="primary">Edit</Button>
        </Card.Body>
      </Card>
    </>
  );
}
