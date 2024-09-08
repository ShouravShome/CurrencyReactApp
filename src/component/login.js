import React, { useState } from "react";
import "../Custom.css";
import login from "../login.png";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            event.preventDefault();
            alert('Please give correct email id!');
            return;
        }
        if (password.length < 8) {
            event.preventDefault();
            alert('Password has to be more than 8 characters!');
            return;
        }
        event.preventDefault();
        window.location.href = "/Converter";
        setEmail("");
        setPassword("");  
    };



    return (
        <div className="container d-flex justify-content-center align-items-center vh-150">
            <div className="login-box d-flex flex-column align-items-center">
                <div className="logo">
                    <img src={login} alt="Logo" className="logo" />
                </div>

                <h2 className="text-center mb-4" style={{ margin: '10px' }}>Currency Converter</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="d-grid gap-2" style={{ marginTop: '10px' }}>
                        <button type="submit" className="btn btn-primary btn-block">
                            Login
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default LoginForm;
