import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function submit() {

        try {

            const response = await fetch("https://military-asset-management-system-1-0ldl.onrender.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            console.log(response);

            if (!response.ok) {
                const error = await response.text();
                console.log("Login failed:", error);
                return;
            }

            const token = await response.text();

            localStorage.setItem("token", token);

            console.log("Login successful");

            const payload = JSON.parse(atob(token.split('.')[1]));

            if (payload.role === "LOGISTICS_OFFICER") {
                navigate("/logistic_officer");
            }

            if (payload.role === "BASE_COMMANDER") {
                navigate("/dashboard");
            }
            if(payload.role === "ADMIN"){
                navigate("/bases");
            }

        } catch (error) {
            console.log("Error:", error);
        }
    }

    return (
        <div className="login-page">

            <div className="login-card">

                <h2 className="login-heading">
                    Login
                </h2>

                <div className="login-form">

                    <input
                        type="email"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        className="login-button"
                        onClick={submit}
                    >
                        Submit
                    </button>

                    <p onClick={()=> navigate("/signup")}> are you new Logistic_Officer ?</p>
                    <p onClick={()=> navigate("/base/signup")}> are you new Base_Commander ?</p>

                    <div className="admin-signup">
                        <span>Are you an Admin?</span>
                        <button onClick={() => navigate("/admin/signup")}>
                            Admin Signup
                        </button>
                    </div>

                </div>

            </div>

            <button onClick={()=>navigate("/admin/signup")}> Are An Admin</button>

        </div>

        
    );
}

