import React, { useState } from "react";
import "./Form.css";

const initialState = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    guess: "",
    pin: "",
};

export default function InterestForm() {
    const [formData, setFormData] = useState(initialState);
    const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "pin") {
            let cleaned = value.replace(/[^0-9]/g, "").slice(0, 16);
            let formatted = cleaned.match(/.{1,4}/g)?.join("-") || "";
            setFormData((prev) => ({ ...prev, [name]: formatted }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
    };

    const handleMouseMove = (e) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    };

    return (
        <div className="form-wrapper" onMouseMove={handleMouseMove}>
            <div className="background-gif" />
            <div
                className="overlay"
                style={{
                    WebkitMaskImage: `radial-gradient(circle 100px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, black 101px)`,
                    maskImage: `radial-gradient(circle 100px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, black 101px)`,
                }}
            />
            <form className="spidr-form" onSubmit={handleSubmit}>
                <h2>Spidr Airfryer Challenge</h2>
                <h3>Aaron Marrs</h3>
                <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
                <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
                <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="number" name="guess" placeholder="Guess the Air Fryer’s Cost ($)" value={formData.guess} onChange={handleChange} required />
                <input name="pin" placeholder="Secret Spidr PIN (####-####-####-####)" value={formData.pin} onChange={handleChange} required />
                <button className="btn btn-line" type="submit">Submit</button>
            </form>
        </div>
    );
}
