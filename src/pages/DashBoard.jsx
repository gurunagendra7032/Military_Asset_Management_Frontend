
import React, { useState } from 'react';
import './DashBoard.css';
import { useNavigate } from 'react-router-dom';

function DashBoard() {

    const [openingBalance, setOpeningBalance] = useState("");
    const [closingBalance, setClosingBalance] = useState("");
    const [net, setNet] = useState("");
    const [assigned, setAssigned] = useState("");
    const [expended, setExpended] = useState("");
    const [equipmentType, setEquipmentType] = useState("");
    const [date, setDateDash] = useState("");

    const navigate = useNavigate();

    function search() {

        const token = localStorage.getItem("token");

        if (!equipmentType || !date) {
            alert("Please select equipment type and date");
            return;
        }

        fetch(`https://military-asset-management-system-1-0ldl.onrender.com/openBalance/${equipmentType}/${date}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setOpeningBalance(data);
            });

        fetch(`https://military-asset-management-system-1-0ldl.onrender.com/closingBalance/${equipmentType}/${date}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setClosingBalance(data);
            });

        fetch(`https://military-asset-management-system-1-0ldl.onrender.com/netMovement/${equipmentType}/${date}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setNet(data);
            });

        fetch(`https://military-asset-management-system-1-0ldl.onrender.com/assignitem/${equipmentType}/${date}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setAssigned(data);
            });

        fetch(`https://military-asset-management-system-1-0ldl.onrender.com/expend/${equipmentType}/${date}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setExpended(data);
            });
    }

    return (
        <div className="dashboard">

            <h1>Base Commander Dashboard</h1>

            <div className="filters">

                <select
                    value={equipmentType}
                    onChange={(e) => setEquipmentType(e.target.value)}
                >
                    <option value="">Select Equipment Type</option>
                    <option value="Vehicle">Vehicle</option>
                    <option value="Weapon">Weapon</option>
                    <option value="Aircraft">Aircraft</option>
                    <option value="Medical">Medical</option>
                </select>

                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDateDash(e.target.value)}
                />

                <button className="search-button" onClick={search}>
                    Search
                </button>

            </div>

            <div className="balance-container">

                <div className="balance-card">
                    <h3>Opening Balance</h3>
                    <p>{openingBalance}</p>
                </div>

                <div className="balance-card">
                    <h3>Closing Balance</h3>
                    <p>{closingBalance}</p>
                </div>

                <div className="balance-card">
                    <h3>Net Movement</h3>
                    <p>{net}</p>
                </div>

                <div className="balance-card">
                    <h3>Assigned</h3>
                    <p>{assigned}</p>
                </div>

                <div className="balance-card">
                    <h3>Expended</h3>
                    <p>{expended}</p>
                </div>

            </div>

            <div className="dashboard-actions">

                <button
                    className="action-button"
                    onClick={() => navigate("/itemAssign")}
                >
                    Item Assign
                </button>

                <button
                    className="action-button"
                    onClick={() => navigate("/expenditure")}
                >
                    Expenditure
                </button>

            </div>

        </div>
    );
}

export default DashBoard;
