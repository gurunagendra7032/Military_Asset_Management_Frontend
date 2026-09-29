import React, { useEffect, useState } from 'react'
import './Signup.css'
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [bases, setBases] = useState([]);
    const [baseId, setBaseId] = useState("");

    const navigate=useNavigate();

    async function submit() {
        const response = await fetch("https://military-asset-management-system-1-0ldl.onrender.com/logistic_officer/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                baseId: Number(baseId)
            })
        });
        if(response.ok){
            navigate("/");
        }else{
            console.log("User not Register");
        }
    }



    useEffect(() => {
        fetch("https://military-asset-management-system-1-0ldl.onrender.com/get/bases")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setBases(data);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2>Register Form</h2>

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

                <button onClick={submit}>Submit</button>
            </div>
        </div>
    )
}

export default SignUp;