import axios from "axios";
import { Formik } from "formik";
import {  useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";


const validateEmail = (email) => {
    return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
  };

export default function Login() {
  const [alertMessage, setAlertMessage] = useState(null);
  const [forceUpdate, setForceUpdate] = useState(0); 
  const navigate = useNavigate();
  return (
    <>
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <Container>
          <Row className="justify-content-center">
            
            <Col xs={12} md={6}>
            <h1 style={{color:"green"}}>SS HOSPITAL</h1>
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
                initialValues={{ email: "", password: "" }}
                validate={(values) => {
                  const errors = {};
                  if (!values.email) {
                    errors.email = "Required";
                  } else if (validateEmail(values.email)) {
                    errors.email = "Invalid email address";
                  }
                  if (!values.password) {
                    errors.password = "Required";
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(true);
                  axios
                    .post("http://localhost:8000/user/login", values)
                    .then((res) => {
                      const result = res.data;
                      console.log(res.data);
                      
                      if (result.message === "Login Successful") {
                        localStorage.setItem("token", result.token);
                        localStorage.setItem("status",result.status);
                        localStorage.setItem("name",result.name);
                        localStorage.setItem("_id",result._id);
                        localStorage.setItem('email',result.email)
                        // login();
                        setAlertMessage("Login Success");
                        setSubmitting(false);
                        navigate("/home");
                        setForceUpdate(prev => prev + 1);
                      }else {
                        console.log("Login Failed", result.message);
                        setAlertMessage(result.message);
                        setSubmitting(false);
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
                        console.error(error);
                      }
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
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        isInvalid={touched.email && errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        isInvalid={touched.password && errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <div className="d-flex justify-content-center mb-3 mt-4">
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Login
                      </Button>
                    </div>
                    <div className="d-flex justify-content-center">
                      <Link to="/signup">Don't have an account? Sing Up</Link>
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
