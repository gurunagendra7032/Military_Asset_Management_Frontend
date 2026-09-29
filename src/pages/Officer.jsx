import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Logistic_Office.css"

function Officer() {

    const navigate = useNavigate();

    return (
        <>
            <div className="page-heading">Welcome Logistic Officer</div>

            <div className="dashboard-actions">

                <button
                    className="action-button"
                    onClick={() => navigate("/purchase")}
                >
                    Purchase Equipment
                </button>

                <button
                    className="action-button"
                    onClick={() => navigate("/transfer")}
                >
                    Transfer Equipment
                </button>

            </div>
        </>
    );
}

export default Officer;
