import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

            if (response.ok) {

                const data = await response.json();

                localStorage.setItem("token", data.token);

                navigate("/login");

            } else {

                const error = await response.text();

                console.log("Admin not registered:", error);
            }

        } catch (error) {

            console.log("Signup error:", error);
        }
    }

    return (
        <>
            <div>

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
                    Submit
                </button>

            </div>
        </>
    );
}