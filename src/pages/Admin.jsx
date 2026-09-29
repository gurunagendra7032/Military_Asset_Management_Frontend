import React from 'react'
import { useNavigate } from 'react-router-dom'


export default function Admin() {

    const navigate=useNavigate();
  return (
    <>
    <button onClick={()=>{navigate("/bases")}}>ADD BASES</button>
    </>
  )
}
