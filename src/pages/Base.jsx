import { useState } from 'react';
import './Base.css';
import { useNavigate } from 'react-router-dom';

function Base() {

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");

    const navigate = useNavigate();

    async function submitDetails() {

        try {
            const res = await fetch(
                "https://military-asset-management-system-1-0ldl.onrender.com/save/base",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({
                        baseName: name,
                        baseLocation: location
                    })
                }
            );

            console.log(res);

            if (res.ok) {
                navigate("/");
            } else {
                const error = await res.text();
                console.log("Failed:", error);
            }

        } catch (error) {
            console.log("Request error:", error);
        }
    }

    return (
        <div className="base-container">
            <div className="base-box">

                <h2>Add Base</h2>

                <input
                    type="text"
                    placeholder="Enter Your Base Name"
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Enter Your Base Location"
                    onChange={(e) => setLocation(e.target.value)}
                />

                <button onClick={submitDetails}>
                    Submit
                </button>

            </div>
        </div>
    );
}

export default Base;