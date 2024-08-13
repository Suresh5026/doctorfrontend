import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./assets/Components/Login";
import Signup from "./assets/Components/Signup";
import Home from "./assets/Components/Pages/Home";
import Appointment from "./assets/Components/Pages/Appointment";
import Doctors from "./assets/Components/Pages/Doctors";
import Applydoctor from "./assets/Components/Pages/Applydoctor";
import Profile from "./assets/Components/Pages/Profile";
import { Container, Row, Col } from "react-bootstrap";
import Navbarc from "./assets/Components/Navbarc";
import { UserProvider } from "./assets/Context/Usercontext";
import ProtectedRoute from "./assets/Context/ProtectedRoute";
import Bookappoint from "./assets/Components/Pages/Bookappoint";
import Doctorapproval from "./assets/Components/Doctorapproval";
import { DoctorProvider } from "./assets/Context/Doctorcontext";


function App() {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/" || location.pathname === "/signup";

  return (
    <DoctorProvider>
      <UserProvider>
      {!hideNavbar && <Navbarc />}
        <Container 
          className={`main-container ${hideNavbar ? "" : "with-sidebar"}` }
        >
          
          <Row>
            {!hideNavbar && (
              <Col xs={12} lg={3}>
                <Navbarc />
              </Col>
            )}
            <Col xs={12} lg={hideNavbar ? 12 : 9}>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                  path="/home"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/appointment"
                  element={
                    <ProtectedRoute>
                      <Appointment />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/doctors"
                  element={
                    <ProtectedRoute>
                      <Doctors />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/applyDoctor"
                  element={
                    <ProtectedRoute>
                      <Applydoctor />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/bookappointment"
                  element={
                    <ProtectedRoute>
                      <Bookappoint />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/doctorApproval"
                  element={
                    <ProtectedRoute>
                      <Doctorapproval />
                    </ProtectedRoute>
                  }
                />
               
              </Routes>
            </Col>
          </Row>
        </Container>
      </UserProvider>
    </DoctorProvider>
  );
}

export default App;
