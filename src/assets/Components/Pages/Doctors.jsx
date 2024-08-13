import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
export default function Doctors(){
    const headings = [
        "S.No" ,
        "Doctor Id",
        "Doctor Name",
        "Doctor Email",
        "Doctor Phone",
        "Status",
        "Action"
    ]
    const [doctor,setDoctor] = useState([]);

    useEffect(()=>{
        const token = localStorage.getItem('token');
        const fetchDoctor =async () =>{
            try{
                const response =await axios.get('https://doctorapp-45j4.onrender.com/doctor/getDoctor',
                    {
                        headers : {
                            Authorization : `Beared ${token}`
                        },
                    }
                );
                const doctorData = response.data.data;
                setDoctor(doctorData);
            }catch(error){
                console.log("Error fetching user data:", error);
            }
        }
        if(token){
            fetchDoctor();
        }
    },[])

    const handleApprove = async (doctorId) => {
        const token = localStorage.getItem('token');
        try {
          await axios.put(
            `https://doctorapp-45j4.onrender.com/approve/approveDoctor/${doctorId}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          
          const response = await axios.get('https://doctorapp-45j4.onrender.com/doctor/getDoctor', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setDoctor(response.data.data);
        } catch (error) {
          console.error('Error approving doctor:', error);
        }
      };


      const handleReject = async (doctorId) => {
        const token = localStorage.getItem('token');
        try {
          await axios.put(
            `https://doctorapp-45j4.onrender.com/approve/approveDoctor/${doctorId}`, 
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
      
         
          const response = await axios.get('https://doctorapp-45j4.onrender.com/doctor/getDoctor', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setDoctor(response.data.data);
        } catch (error) {
          console.error('Error rejecting doctor:', error);
        }
      };
      

    const filteredDoctors = doctor.filter((doc) => doc.status === "Pending");
    return (
        <>
        <Table responsive>
            <thead>
                <tr>
                    {headings.map((head,index)=>(
                        <th key={index}>{head}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                    {filteredDoctors.map((element,index)=>(
                        <tr key={`${element.firstname}-${index}`}>
                            <td>{index+1}</td>
                            <td>{element._id}</td>
                            <td>{element.firstname}</td>
                            <td>{element.email}</td>
                            <td>{element.phonenumber}</td>
                            <td>{element.status}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleApprove(element._id)}>Approve</Button>
                                <Button variant="danger" onClick={() => handleReject(element._id)}>Reject</Button>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </Table>
        </>
    )
}