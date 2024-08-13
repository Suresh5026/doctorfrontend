import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [doctorId, setDoctorId] = useState(null);
  const [doctor, setDoctor] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchDoctorIdByEmail = async () => {
      try {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email"); 
        if (!email) {
          console.error("Doctor email not found in local storage.");
          return;
        }

        const response = await axios.get(`https://doctorapp-45j4.onrender.com/doctor/getDoctorByEmail/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        setDoctorId(response.data.doctorId);
      } catch (error) {
        console.error("Error fetching doctor ID by email:", error);
      }
    };
    fetchDoctorIdByEmail();
  }, []);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        if (!doctorId) return;

        const response = await axios.get(`https://doctorapp-45j4.onrender.com/doctor/getDoctor/${doctorId}`);
        setDoctor(response.data.data);
        setFormData(response.data.data); 
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`https://doctorapp-45j4.onrender.com/doctor/update-doctor/${doctorId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setDoctor(formData); 
      setEditMode(false); 
    } catch (error) {
      console.error("Error updating doctor data:", error);
    }
  };

  return (
    <>
      <Card className="mt-5">
        <Card.Header>
          <h1>
            {doctor.firstname} {doctor.lastname}
          </h1>
        </Card.Header>
        <Card.Body>
          {editMode ? (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formFirstname">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstname"
                  value={formData.firstname || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formLastname">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastname"
                  value={formData.lastname || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPhonenumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="phonenumber"
                  value={formData.phonenumber || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  disabled
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={formData.city || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formFees">
                <Form.Label>Fees</Form.Label>
                <Form.Control
                  type="number"
                  name="fees"
                  value={formData.fees || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formFromTiming">
                <Form.Label>From Timing</Form.Label>
                <Form.Control
                  type="text"
                  name="fromTiming"
                  value={formData.fromTiming || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formToTiming">
                <Form.Label>To Timing</Form.Label>
                <Form.Control
                  type="text"
                  name="toTiming"
                  value={formData.toTiming || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
              <Button variant="secondary" onClick={() => setEditMode(false)} className="ms-2">
                Cancel
              </Button>
            </Form>
          ) : (
            <>
              <Card.Title>{doctor.spe}</Card.Title>
              <Card.Text>Phone Number: {doctor.phonenumber}</Card.Text>
              <Card.Text>Email: {doctor.email}</Card.Text>
              <Card.Text>Address: {doctor.address}</Card.Text>
              <Card.Text>City: {doctor.city}</Card.Text>
              <Card.Text>Fees: {doctor.fees}</Card.Text>
              <Card.Text>
                Time: {doctor.fromTiming} AM - {doctor.toTiming} PM
              </Card.Text>
              <Button variant="primary" onClick={() => setEditMode(true)}>
                Edit
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    </>
  );
}
