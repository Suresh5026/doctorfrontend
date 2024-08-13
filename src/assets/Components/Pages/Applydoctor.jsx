import { Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { Formik } from "formik";

export default function Applydoctor() {
  const initialValues = {
    firstname: "",
    lastname: "",
    phonenumber: "",
    email: "",
    address: "",
    city: "",
    spe: "",
    exp: "",
    fees: "",
    fromTiming: "",
    toTiming: "",
  };
  return (
    <>
      <h4>Apply Doctor</h4>
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors = {};
          if (!values.firstname) {
            errors.firstname = "Required";
          }
          if (!values.lastname) {
            errors.lastname = "Required";
          }
          if (!values.phonenumber) {
            errors.phonenumber = "Required";
          }
          if (!values.email) {
            errors.email = "Required";
          }
          if (!values.address) {
            errors.address = "Required";
          }
          if (!values.city) {
            errors.city = "Required";
          }
          if (!values.spe) {
            errors.spe = "Required";
          }
          if (!values.exp) {
            errors.exp = "Required";
          }
          if (!values.fees) {
            errors.fees = "Required";
          }
          if (!values.fromTiming) {
            errors.fromTiming = "Required";
          }
          if (!values.toTiming) {
            errors.toTiming = "Required";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const token = localStorage.getItem("token");
          if (!token) {
            console.error("No token found in localStorage");
            setSubmitting(false);
            return;
          }
          try {
            const response = await axios.post(
              "http://localhost:8000/doctor/create-doctor",
              values,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            console.log(response.data);
            resetForm();
          } catch (error) {
            console.error("There was an error creating the Doctor!", error);
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
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <h5>Personal Informaion</h5>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="firstname">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstname"
                    placeholder="Enter First Name"
                    value={values.firstname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.firstname && errors.firstname ? (
                    <div>{errors.firstname}</div>
                  ) : null}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="lastname">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastname"
                    placeholder="Enter Last Name"
                    value={values.lastname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.lastname && errors.lastname ? (
                    <div>{errors.lastname}</div>
                  ) : null}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="phonenumber">
                  <Form.Label>Email Phone Number</Form.Label>
                  <Form.Control
                    type="Number"
                    name="phonenumber"
                    placeholder="+91"
                    value={values.phonenumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.phonenumber && errors.phonenumber ? (
                    <div>{errors.phonenumber}</div>
                  ) : null}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    required
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.email && errors.email ? (
                    <div>{errors.email}</div>
                  ) : null}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    placeholder="Enter Door No & Street Name"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.address && errors.address ? (
                    <div>{errors.address}</div>
                  ) : null}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    placeholder="Enter City Name"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.city && errors.city ? (
                    <div>{errors.city}</div>
                  ) : null}
                </Form.Group>
              </Col>
            </Row>
            <h5>Professional Information</h5>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="spe">
                  <Form.Label>Specialization</Form.Label>
                  <Form.Control
                    type="text"
                    name="spe"
                    placeholder="Enter Specialization"
                    value={values.spe}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.spe && errors.spe ? <div>{errors.spe}</div> : null}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="exp">
                  <Form.Label>Experience</Form.Label>
                  <Form.Control
                    type="Number"
                    name="exp"
                    placeholder="0"
                    value={values.exp}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.exp && errors.exp ? <div>{errors.exp}</div> : null}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="fees">
                  <Form.Label>Fee Per Consultation</Form.Label>
                  <Form.Control
                    type="number"
                    name="fees"
                    placeholder="0"
                    value={values.fees}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.fees && errors.fees ? (
                    <div>{errors.fees}</div>
                  ) : null}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="timings">
                  <Form.Label>Consultation Timings</Form.Label>
                  <Row>
                    <Col>
                      <Form.Group controlId="fromTiming">
                        <Form.Label>From</Form.Label>
                        <Form.Control
                          type="time"
                          name="fromTiming"
                          required
                          value={values.fromTiming}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.fromTiming && errors.fromTiming ? (
                          <div>{errors.fromTiming}</div>
                        ) : null}
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="toTiming">
                        <Form.Label>To</Form.Label>
                        <Form.Control
                          type="time"
                          name="toTiming"
                          required
                          value={values.toTiming}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.toTiming && errors.toTiming ? (
                          <div>{errors.toTiming}</div>
                        ) : null}
                      </Form.Group>
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
            </Row>
            <Button variant="success" type="submit" disabled={isSubmitting}>
              Submit
            </Button>
            <Button type="reset">Cancel</Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
