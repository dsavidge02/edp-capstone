import React, { useState } from "react";

const Checkout = () => {
    const [address, setForm] = useState("");

    const handleChange = (e) => {
        setForm(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitted Address:", address);
        // Add your submission logic here, for example:
        // try {
        //     const response = await fetch('your-api-endpoint', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({ address }),
        //     });
        //     if (!response.ok) {
        //         throw new Error(`HTTP error! status: ${response.status}`);
        //     }
        //     const data = await response.json();
        //     console.log(data);
        // } catch (error) {
        //     console.error("Error posting data", error);
        // }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={address}
                    onChange={handleChange}
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Submit
            </button>
        </form>
    );
};

export default Checkout;
