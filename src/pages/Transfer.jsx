import React, { useEffect, useState } from 'react';
import './Transfer.css';

function Transfer() {


    const [equipment, setEquipment] = useState("");
    const [equipmentName, setEquipmentName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [date, setDate] = useState("");

    const [bases, setBases] = useState([]);
    const [baseId, setBaseId] = useState("");


    const [transfers, setTransfers] = useState([]);
    const [filterEquipmentType, setFilterEquipmentType] = useState("");
    const [filterDate, setFilterDate] = useState("");

    const [message,setMessage]=useState("");

    async function submit() {

        const token = localStorage.getItem("token");

       const response= await fetch("https://military-asset-management-system-1-0ldl.onrender.com/transfer/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                equipmentType: equipment,
                equipmentName: equipmentName,
                equipmentQuantity: Number(quantity),
                toBase: {
                    id: Number(baseId)
                },
                transferDate: date
            }),
        });

        if(response.ok){
            setMessage("assest Transfer Successfully");
        }
        
        getTransfers();
    }

    async function getTransfers() {

        if (!filterEquipmentType || !filterDate) {
            alert("Please select equipment type and date");
            return;
        }

        const token = localStorage.getItem("token");

        fetch(
            `https://military-asset-management-system-1-0ldl.onrender.com/transfers/${filterEquipmentType}/${filterDate}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setTransfers(data);
            })
            .catch(error => {
                console.error(error);
            });
    }

  
    useEffect(() => {

        fetch("https://military-asset-management-system-1-0ldl.onrender.com/get/bases")
            .then(response => response.json())
            .then(data => {
                setBases(data);
            })
            .catch(error => console.log(error));

    }, []);

    return (
        <>
            <h2 className="heading">
                Transfer Equipment
            </h2>

            {/* Transfer Form */}

            <div className="Transfer">

                <select
                    value={equipment}
                    onChange={(e) => setEquipment(e.target.value)}
                >
                    <option value="">Select Equipment Type</option>
                    <option value="Vehicle">Vehicle</option>
                    <option value="Weapon">Weapon</option>
                    <option value="Aircraft">Aircraft</option>
                    <option value="Medical">Medical</option>
                </select>

                <input
                    type="text"
                    placeholder="Enter Equipment Name"
                    onChange={(e) =>
                        setEquipmentName(e.target.value)
                    }
                />

                <input
                    type="number"
                    placeholder="Enter the number"
                    onChange={(e) =>
                        setQuantity(e.target.value)
                    }
                />

                <select
                    value={baseId}
                    onChange={(e) => setBaseId(e.target.value)}
                >
                    <option value="">Select To Base</option>

                    {bases.map(base => (
                        <option
                            key={base.id}
                            value={base.id}
                        >
                            {base.baseName}
                        </option>
                    ))}
                </select>

                <input
                    type="datetime-local"
                    value={date}
                    onChange={(e) =>
                        setDate(e.target.value)
                    }
                />

                <button onClick={submit}>
                    Submit
                </button>

                {message && <p>{message}</p>}

            </div>


            {/* Transfer History Filter */}

            <h2 className="heading">
                Transfer History
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
                    type="datetime-local"
                    value={filterDate}
                    onChange={(e) =>
                        setFilterDate(e.target.value)
                    }
                />

                <button
                    className="search-button"
                    onClick={getTransfers}
                >
                    Search
                </button>

            </div>


            {/* Results */}

            <div className="transfer-list">

                {transfers.map((transfer) => (

                    <div
                        className="transfer-card"
                        key={transfer.id}
                    >

                        <p>
                            <strong>Equipment Type:</strong>{" "}
                            {transfer.equipmentType}
                        </p>

                        <p>
                            <strong>Equipment Name:</strong>{" "}
                            {transfer.equipmentName}
                        </p>

                        <p>
                            <strong>Quantity:</strong>{" "}
                            {transfer.equipmentQuantity}
                        </p>

                        <p>
                            <strong>From Base:</strong>{" "}
                            {transfer.fromBase?.baseName}
                        </p>

                        <p>
                            <strong>To Base:</strong>{" "}
                            {transfer.toBase?.baseName}
                        </p>

                        <p>
                            <strong>Transfer Date:</strong>{" "}
                            {transfer.transferDate}
                        </p>

                    </div>

                ))}

            </div>
        </>
    );
}

export default Transfer;

