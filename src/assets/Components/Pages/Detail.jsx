import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  FormControl,
  Button,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";

export default function Detail() {
  const [doctor, setDoctor] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(
          "https://doctorapp-45j4.onrender.com/doctor/getDoctor",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDoctor(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };
    if (token) {
      fetchDoctor();
    }
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredDoctors = doctor.filter(
    (doc) =>
      doc.status === "Approved" &&
      doc.spe.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Container fluid style={{ minHeight: "100vh" }}>
        <Row
          className="justify-content-center align-items-center"
          style={{ minHeight: "18vh" }}
        >
          <Col
            xs={12}
            md={4}
            className="d-flex justify-content-center align-items-center"
          >
            <Form className="d-flex">
              <FormControl
                type="text"
                placeholder="Specialization"
                className="me-2"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Col>
        </Row>

        <Row
          className="justify-content-center align-items-center"
          style={{ minHeight: "40vh" }}
        >
          {filteredDoctors.map((element, index) => (
            <Col key={`${element._id}-${index}`} className="d-flex justify-content-center align-items-center mb-4">
              <Card style={{ width: "18rem", background: "lightblue" }}>
                <Card.Body>
                  <Card.Title>
                    Doctor Name: {element.firstname} {element.lastname}
                  </Card.Title>
                  <Card.Text>Specialization: {element.spe}</Card.Text>
                  <Card.Text>Phone: {element.phonenumber}</Card.Text>
                  <Card.Text>Email: {element.email}</Card.Text>
                  <Card.Text>Fees: Rs. {element.fees}</Card.Text>
                  <Card.Text>
                    From: {element.fromTiming} AM To: {element.toTiming} PM
                  </Card.Text>
                  <Link to="/bookappointment" state={{ doctor: element }}>
                    <Button variant="primary">Check Availability</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
