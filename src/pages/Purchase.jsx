import React, { useEffect } from 'react';
import {useState} from 'react'
import "./Purchase.css"

function Purchase() {
 const[equipment,setEquipment]=useState("");
 const[equipmentname,setEquipmentName]=useState("");
 const[quantity,setQuantity]=useState("");
 const[date,setDate]=useState("");

  const [filterEquipmentType, setFilterEquipmentType] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const [purchases, setPurchases] = useState([]);
   async function submit(){

       const token = localStorage.getItem("token");
     await fetch("https://military-asset-management-system-1-0ldl.onrender.com/purchase/save",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body:JSON.stringify({
            equipmentType:equipment,
            equipmentName:equipmentname,
            quantity:quantity,
            purchaseDate:date

        }),
     });
   }


  async function getPurchases() {

        if (!filterEquipmentType || !filterDate) {
            alert("Please select equipment type and date");
            return;
        }

        fetch(
            `https://military-asset-management-system-1-0ldl.onrender.com/purchases/${filterEquipmentType}/${filterDate}`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }
        )
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setPurchases(data);
            })
            .catch(error => {
                console.log(error);
            });
          }     


  return (
  
    <>
    <h2 className='heading'>Purchase Equipment</h2>
      <div className="Purchase">
        <select id='equipment' onChange={(e)=>setEquipment(e.target.value)}>
          <option value="">Select Equipment Type</option>
          <option value="Vehicle">Vehicle</option>
          <option value="Weapon">Weapon</option>
          <option value="Aircraft">Aircraft</option>
          <option value="Medical">Medical</option>
        </select>
        <input type="text" placeholder='Enter equipment Name' className="equipmentName" onChange={(e)=>setEquipmentName(e.target.value)}/>

        <input type="number" placeholder="Enter Quantity" className="equipmentNumber" onChange={(e)=>setQuantity(e.target.value)}/>
        

        <input type="date" className="date" onChange={(e)=>setDate(e.target.value)}/>
        <button type="button" onClick={submit}>Submit</button>
      </div>


       <h2 className="heading">
                Purchase History
            </h2>

            <div className="filters">

                <select
                    value={filterEquipmentType}
                    onChange={(e) =>
                        setFilterEquipmentType(e.target.value)
                    }
                >
                    <option value="">Select Equipment Type</option>
                    <option value="Vehicle">Vehicle</option>
                    <option value="Weapon">Weapon</option>
                    <option value="Aircraft">Aircraft</option>
                    <option value="Medical">Medical</option>
                </select>

                <input
                    type="date"
                    value={filterDate}
                    onChange={(e) =>
                        setFilterDate(e.target.value)
                    }
                />

                <button onClick={getPurchases}>
                    Search
                </button>

            </div>


            <div className="expenditure-list">

                {purchases.map((purchases) => (

                    <div
                        className="expenditure-card"
                        key={purchases.id}
                    >

                        <p>
                            <strong>Equipment:</strong>{" "}
                            {purchases.equipmentType}
                        </p>

                        <p>
                            <strong>Asset Name:</strong>{" "}
                            {purchases.equipmentName}
                        </p>

                        <p>
                            <strong>Quantity:</strong>{" "}
                            {purchases.quantity}
                        </p>

                        <p>
                            <strong>Date:</strong>{" "}
                            {purchases.purchaseDate}
                        </p>

                    </div>

                ))}

            </div>
    </>
  );
}

export default Purchase;