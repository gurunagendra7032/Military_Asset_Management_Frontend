import { useState } from 'react'
import './Base.css'

function Base() {

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");

    function submitDetails() {
        console.log(name, location);
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
    )
}

export default Base;