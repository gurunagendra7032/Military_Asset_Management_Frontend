import React, { useEffect } from 'react'
import {useState} from 'react'
import "./AssetAssign.css"

function ItemAssignment() {
  const[name,setName]=useState("");
  const[equimentType,setEquipmentType]=useState("");
  const[asset,setAsset]=useState("");
  const[quantity,setQuantity]=useState("");
  const[date,setDate]=useState("");
  const[message,setMessage]=useState("");

  async function submit(){

    const token=localStorage.getItem("token");

    const response=await fetch("https://military-asset-management-system-1-0ldl.onrender.com/itemAssignment",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body:JSON.stringify({
        personName:name,
        equipmentType:equimentType,
        assetName:asset,
        assetQuantity:quantity,
        assignedDate:date
      }),

    });

    if(response.ok){
      setMessage("assest assign successfully");
    }

  }

  useEffect(()=>{

    const token=localStorage.getItem("token")
      fetch("https://military-asset-management-system-1-0ldl.onrender.com/assign",{
        headers:{
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(response=>response.json())
            .then(data => {console.log(data)})
            .catch(error => {
                console.error(error);
              });

        },[]);



  return (
    <>
    <h2 className="heading"> Asset Assignment</h2>
    <div className="ItemAssign">
      <input type='text' placeholder="Enter Name" onChange={(e)=>setName(e.target.value)}></input>
       <select onChange={(e)=>setEquipmentType(e.target.value)}>
          <option value="">Select Equipment Type</option>
          <option value="Vehicle">Vehicle</option>
          <option value="Weapon">Weapon</option>
          <option value="Aircraft">Aircraft</option>
          <option value="Medical">Medical</option>
        </select>
      <input type='text' placeholder="Enter asset Name" onChange={(e)=> setAsset(e.target.value)}></input>
      <input type='number' placeholder="Enter Quantity" onChange={(e)=> setQuantity(e.target.value)}></input>
      <input type='date' placeholder='choose Date' onChange={(e)=> setDate(e.target.value)}></input>
      <button onClick={submit}> Submit </button>
      {message && <p>{message}</p>}
    </div>

    <div>

    </div>
    </>
  )
}

export default ItemAssignment;
