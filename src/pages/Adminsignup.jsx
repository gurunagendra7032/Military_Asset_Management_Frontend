import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Adminsignup() {
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
   
    const navigate=useNavigate();

    async function submit(){
         const response= fetch("http://localhost:8080/admin/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name: name,
                email: email,
                password: password
            })
          })
       if(response.ok){
         navigate("/login")
       }else{
         console.log("Admin not registerd");
       }
          
    }
  return (
    <>
    <div>
        <input type="text" placeholder='Enter Admin Name' onChange={(e)=>{setName(e.target.value)}}></input>
        <input type="email" placeholder='Enter Admin Email'onChange={(e)=>{setEmail(e.target.value)}}></input>
        <input type="password" placeholder="Enter Admin Password" onChange={(e)=>{setPassword(e.target.value)}}></input>
        <button onClick={submit}> Submit</button>
        </div>
    </>
  )
}
