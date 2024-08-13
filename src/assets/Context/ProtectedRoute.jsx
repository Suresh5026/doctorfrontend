import React, {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const ProtectedRoute = ({ children }) => {
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      setShowContent(true);
    }
  }, [navigate]);

  if (!showContent) {
    return null; 
  }

  return <>{children}</>;
};

export default ProtectedRoute;
