import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState(null);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in localStorage");
          return null;
        }

        const response = await axios.get('http://localhost:8000/user/current-user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data.data;
      } catch (error) {
        console.error('Error fetching logged-in user details:', error);
        return null;
      }
    };

    const fetchDoctors = async () => {
      try {
        const loggedInUser = await fetchLoggedInUser();
        if (!loggedInUser) return;

        const response = await axios.get('http://localhost:8000/doctor/getDoctor');
        const doctorsData = response.data.data;
        setDoctors(doctorsData);

        const matchedDoctor = doctorsData.find(doctor => doctor.email === loggedInUser.email);
        if (matchedDoctor) {
          setDoctorId(matchedDoctor._id);
        } else {
          console.warn('No matching doctor found for the logged-in user');
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <DoctorContext.Provider value={{ doctors, doctorId }}>
      {children}
    </DoctorContext.Provider>
  );
};
