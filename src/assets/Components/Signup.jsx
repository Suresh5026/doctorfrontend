import axios from "axios";
import { Formik } from "formik";
import { useState } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState(null);
  return (
    <>
      <div className="d-flex align-items-center justify-content-center min-vh-100">
      <Container>
        
          <Row className="justify-content-center">
            <Col xs={12} md={6}>
            <h1 style={{color : "green"}}>Welcome SS Hospital</h1>
              {alertMessage && (
                <Alert
                  variant="danger"
                  onClose={() => setAlertMessage(null)}
                  dismissible
                >
                  {alertMessage}
                </Alert>
              )}
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  password: "",
                  confirmpassword: "",
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.name) {
                    errors.name = "Required!";
                  } else if (values.name.length < 3) {
                    errors.name = "Account name should be atleast 3 characters";
                  }
                  if (!values.email) {
                    errors.email = "Required!";
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.email
                    )
                  ) {
                    errors.email = "Invalid email address";
                  }
                  if (!values.password) {
                    errors.password = "Required";
                  }
                  if (!values.confirmpassword) {
                    errors.password = "Required";
                  } else if (values.password.length > 8) {
                    errors.password =
                      "Password length at should be greater than 8 characters";
                  }
                  if (values.password !== values.confirmpassword) {
                    errors.confirmpassword = "password mismatch";
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(true);
                  axios
                    .post("https://doctorapp-45j4.onrender.com/user/register", values)
                    .then((res) => {
                      const response = res.data;
                      if (response.message === "User Registered Successfully") {
                        // navigate("/login");
                        setAlertMessage('User Registered')
                      }
                    })
                    .catch((error) => {
                      if (
                        error.response &&
                        error.response.data &&
                        error.response.data.message
                      ) {
                        setAlertMessage(error.response.data.message);
                      } else {
                        setAlertMessage("An error occurred. Please try again.");
                      }
                    })
                    .finally(() => {
                      setSubmitting(false);
                    });
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
                  <Form className="signup-form" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="regname">
                      <Form.Label>Name</Form.Label>
                      <Form.Label className="text-danger">*</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        isInvalid={touched.name && !!errors.name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Label className="text-danger">*</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        isInvalid={touched.email && !!errors.email}
                      />
                      <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Label className="text-danger">*</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        isInvalid={touched.password && !!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="formBasicConfirmPassword"
                    >
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Label className="text-danger">*</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmpassword"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirmpassword}
                        isInvalid={
                          touched.confirmpassword && !!errors.confirmpassword
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.confirmpassword}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <div className="d-flex justify-content-center mt-4">
                      <Button variant="success" type="submit" className="me-2" disabled={isSubmitting}>
                        Sign Up
                      </Button>
                      <Button variant="warning" type="submit">
                        Cancel
                      </Button>
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                      <Link to="/">Already have an account? Login</Link>
                    </div>
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
