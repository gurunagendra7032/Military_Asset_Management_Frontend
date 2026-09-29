
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminSignup.css';

export default function Adminsignup() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function submit() {

        try {

            const response = await fetch(
                "https://military-asset-management-system-1-0ldl.onrender.com/admin/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        password: password
                    })
                }
            );

            console.log(response);

            if (response.ok) {
                navigate("/");
            } else {
                const error = await response.text();
                console.log("Admin not registered:", error);
            }

        } catch (error) {
            console.log("Signup error:", error);
        }
    }

    return (
        <div className="admin-signup-page">

            <div className="admin-signup-card">

                <h2>Admin Signup</h2>

                <input
                    type="text"
                    placeholder="Enter Admin Name"
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Enter Admin Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Enter Admin Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={submit}>
                    Create Admin Account
                </button>

                <p onClick={() => navigate("/")}>
                    Already have an account? Login
                </p>

            </div>

        </div>
    );
}
