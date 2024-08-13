import React, { useState } from "react";
import { Form, Button, Card, Dropdown } from "react-bootstrap";
import axios from "axios";

export default function PaymentModal({ appointment, onClose }) {
  const [paymentMode, setPaymentMode] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cmuNumber, setCmuNumber] = useState("");
  const [errors, setErrors] = useState({});

  const handleSelect = (e) => {
    setPaymentMode(e);
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };

  const handleCmuNumberChange = (e) => {
    setCmuNumber(e.target.value);
  };

  const validate = () => {
    const errors = {};
    if (paymentMode === "credit card") {
      if (cardNumber.length !== 16) {
        errors.cardNumber = "Credit card number must be 16 digits.";
      }
      if (cmuNumber.length !== 3) {
        errors.cmuNumber = "CMU number must be 3 digits.";
      }
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        const paymentData = {
          appointmentId: appointment._id,
          mode: paymentMode,
        };

        if (paymentMode === "credit card") {
          paymentData.cardNumber = cardNumber;
          paymentData.cmuNumber = cmuNumber;
        }

        const response = await axios.post("https://doctorapp-45j4.onrender.com/pay/make-payment", paymentData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log("Payment successful:", response.data);
        onClose();
      } catch (error) {
        console.error("Payment error:", error);
      }
    }
  };

  return (
    <Card>
      <Card.Header>Amount: {appointment.doctorFees}</Card.Header>
      <Card.Body>
        <Card.Title></Card.Title>
        
        <Dropdown onSelect={handleSelect}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Choose payment mode
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey="credit card">Credit Card</Dropdown.Item>
            <Dropdown.Item eventKey="cash-payment">Cash Payment</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {paymentMode === "credit card" && (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="cardNumber" className="mt-3">
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                type="text"
                value={cardNumber}
                onChange={handleCardNumberChange}
                maxLength="16"
                isInvalid={!!errors.cardNumber}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.cardNumber}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="cmuNumber" className="mt-3">
              <Form.Label>CMU Number</Form.Label>
              <Form.Control
                type="text"
                value={cmuNumber}
                onChange={handleCmuNumberChange}
                maxLength="3"
                isInvalid={!!errors.cmuNumber}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.cmuNumber}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        )}
      </Card.Body>
    </Card>
  );
}
