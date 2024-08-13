import { useContext, useEffect, useState } from "react";
import Detail from "./Detail";
import Doctorhome from "./Doctorhome";


export default function Home() {
  const [status, setStatus] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token');
    const status = localStorage.getItem('status');
    if(token){
      setStatus(status)
    }

  }, [status]);

  return (
    <>
      {status === "Admin" || status === "User" ? <Detail /> : null}
      {status === "Doctor" ? <Doctorhome /> : null}
      
    </>
  );
}
