import React, { useState, useEffect } from 'react';
import './BaseCommander.css';

export default function BaseCommander() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [bases, setBases] = useState([]);
    const [baseId, setBaseId] = useState("");

    async function submit() {
        const response = await fetch(
            "http://localhost:8080/base_commander/signup",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    baseId: baseId
                })
            }
        );

        console.log(response);
    }

    useEffect(() => {
        fetch("http://localhost:8080/get/bases")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setBases(data);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="commander-container">

            <div className="commander-box">

                <h2>Base Commander Registration</h2>

                <input
                    type="text"
                    placeholder="Enter Your Name"
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Enter Your Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Enter Your Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <select
                    value={baseId}
                    onChange={(e) => setBaseId(e.target.value)}
                >
                    <option value="">Select Base</option>

                    {bases.map(base => (
                        <option key={base.id} value={base.id}>
                            {base.baseName}
                        </option>
                    ))}
                </select>

                <button onClick={submit}>
                    Submit
                </button>

            </div>

        </div>
    );
}