import { useContext, useEffect, useState } from "react";
import Detail from "./Detail";
import Doctorhome from "./Doctorhome";


export default function Home() {
  // const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token');
    const status = localStorage.getItem('status');
    if(token){
      setStatus(status)
    }

  }, [status]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      {status === "Admin" || status === "User" ? <Detail /> : null}
      {status === "Doctor" ? <Doctorhome /> : null}
      
    </>
  );
}
