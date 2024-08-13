import React, { useContext, useEffect, useState } from "react";

import { Offcanvas, Nav } from "react-bootstrap";
import {
  FaHome,
  FaUserMd,
  FaBars,
  FaBookMedical,
  FaHospitalUser,
  FaUserCircle,
} from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { UserContext } from "../Context/Usercontext";
import { useNavigate, Link } from "react-router-dom";

export default function Navbarc() {
  const {  logout } = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [status, setStatus] = useState(null);
  const [name, setName] = useState(null);
  
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  console.log(isLoggedIn);
  console.log(status);
  console.log(name);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const status = localStorage.getItem('status');
    const name = localStorage.getItem('name');

    if(token){
      setIsLoggedIn(true);
          setStatus(status);
          setName(name);
    }
    
    if (status !== undefined && isLoggedIn !== undefined && name !== undefined) {
      setLoading(false);
    }
  }, [status, isLoggedIn, name]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <>
      <div
        className="d-md-none position-fixed top-0 end-0 m-3 p-2"
        style={{ cursor: "pointer" }}
        onClick={() => setShow(true)}
      >
        <FaBars size={24} />
      </div>

      <Offcanvas show={show} onHide={() => setShow(false)} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {name} / {status}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/home">
              <FaHome /> Home
            </Nav.Link>
            {isLoggedIn && status !== "Doctor" && status !== "Admin" && (
              <Nav.Link as={Link} to="/appointment">
                <FaBookMedical /> Appointments
              </Nav.Link>
            )}
            {isLoggedIn && status !== "User" && status !== "Admin" && (
              <Nav.Link as={Link} to="/doctorApproval">
                <FaBookMedical /> Doctor Approval
              </Nav.Link>
            )}
            {isLoggedIn && status !== "Admin" && status !== "Doctor" && (
              <Nav.Link as={Link} to="/applydoctor">
                <FaHospitalUser /> Apply Doctor
              </Nav.Link>
            )}

            {isLoggedIn && status === "Admin" && (
              <Nav.Link as={Link} to="/doctors">
                <FaUserMd /> Doctors
              </Nav.Link>
            )}
            {isLoggedIn && status === "Doctor" && (
              <Nav.Link as={Link} to="/profile">
                <FaUserCircle /> Profile
              </Nav.Link>
            )}
            <Nav.Link onClick={handleLogout}>
              <MdLogout /> Logout
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      <div className="sidebar d-none d-md-block">
        <h5>{name}</h5>
        <p>{status}</p>
        <br />
        <Nav className="flex-column">
          <Nav.Link as={Link} to="/home">
            <FaHome /> Home
          </Nav.Link>
          {isLoggedIn && status !== "Doctor" && status !== "Admin" && (
            <Nav.Link as={Link} to="/appointment">
              <FaBookMedical /> Appointments
            </Nav.Link>
          )}
          {isLoggedIn && status !== "User" && status !== "Admin" && (
            <Nav.Link as={Link} to="/doctorApproval">
              <FaBookMedical /> Doctor Approval
            </Nav.Link>
          )}
          {isLoggedIn && status !== "Admin" && status !== "Doctor" && (
            <Nav.Link as={Link} to="/applydoctor">
              <FaHospitalUser /> Apply Doctor
            </Nav.Link>
          )}

          {isLoggedIn && status === "Admin" && (
            <Nav.Link as={Link} to="/doctors">
              <FaUserMd /> Doctors
            </Nav.Link>
          )}
          {isLoggedIn && status === "Doctor" && (
            <Nav.Link as={Link} to="/profile">
              <FaUserCircle /> Profile
            </Nav.Link>
          )}
          <Nav.Link onClick={handleLogout}>
            <MdLogout /> Logout
          </Nav.Link>
        </Nav>
      </div>
    </>
  );
}
