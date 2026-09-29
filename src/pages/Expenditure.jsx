import React, { useEffect, useState } from 'react';
import "./Expenditure.css";

function Expenditure() {

    // Save form
    const [assetName, setAssetName] = useState("");
    const [equimentType, setEquipmentType] = useState("");
    const [number, setNumber] = useState("");
    const [reason, setReason] = useState("");
    const [date, setDate] = useState("");

    // History filter
    const [filterEquipmentType, setFilterEquipmentType] = useState("");
    const [filterDate, setFilterDate] = useState("");

    const [expenditures, setExpenditures] = useState([]);

    async function submit() {

        await fetch("https://military-asset-management-system-1-0ldl.onrender.com/save/expenditure", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                equipmentName: assetName,
                equipmentType: equimentType,
                equipmentQuantity: number,
                reason: reason,
                date: date
            }),
        });

        getExpenditures();
    }

    async function getExpenditures() {

        if (!filterEquipmentType || !filterDate) {
            alert("Please select equipment type and date");
            return;
        }

        fetch(
            `https://military-asset-management-system-1-0ldl.onrender.com/expenditure/${filterEquipmentType}/${filterDate}`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }
        )
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setExpenditures(data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <>
            <h2 className="heading">
                Equipment Expenditure
            </h2>

            {/* Save Expenditure */}

            <div className="Expenditure">

                <select
                    value={equimentType}
                    onChange={(e) => setEquipmentType(e.target.value)}
                >
                    <option value="">Select Equipment Type</option>
                    <option value="Vehicle">Vehicle</option>
                    <option value="Weapon">Weapon</option>
                    <option value="Aircraft">Aircraft</option>
                    <option value="Medical">Medical</option>
                </select>

                <input
                    type="text"
                    placeholder="Enter asset Name"
                    onChange={(e) => setAssetName(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Enter asset Number"
                    onChange={(e) => setNumber(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Enter the Reason"
                    onChange={(e) => setReason(e.target.value)}
                />

                <input
                    type="date"
                    onChange={(e) => setDate(e.target.value)}
                />

                <button onClick={submit}>
                    Submit
                </button>

            </div>


            {/* History */}

            <h2 className="heading">
                Expenditure History
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

                <button onClick={getExpenditures}>
                    Search
                </button>

            </div>


            <div className="expenditure-list">

                {expenditures.map((expenditure) => (

                    <div
                        className="expenditure-card"
                        key={expenditure.id}
                    >

                        <p>
                            <strong>Equipment:</strong>{" "}
                            {expenditure.equipmentType}
                        </p>

                        <p>
                            <strong>Asset Name:</strong>{" "}
                            {expenditure.equipmentName}
                        </p>

                        <p>
                            <strong>Quantity:</strong>{" "}
                            {expenditure.equipmentQuantity}
                        </p>

                        <p>
                            <strong>Reason:</strong>{" "}
                            {expenditure.reason}
                        </p>

                        <p>
                            <strong>Date:</strong>{" "}
                            {expenditure.date}
                        </p>

                    </div>

                ))}

            </div>
        </>
    );
}

export default Expenditure;
