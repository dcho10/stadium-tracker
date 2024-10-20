// Set up imports
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";

import "./Signup.css";

export default function Login() {
    // Set up initial form state
    const [formState, setFormState ] = useState({
        email: "",
        password: ""
    });

    // Login mutation
    const [login, {error, data }] = useMutation(LOGIN);

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // Login logic - fetch the token after the user has logged in, and re-direct user to welcome page
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await login({
                variables: { ...formState },
            });

            Auth.login(data.login.token);

            navigate("/welcome");
        } catch (err) {
            console.error(err);
        }

        setFormState({
            email: "",
            password: ""
        });
    };

    return (
        <form onSubmit={handleFormSubmit} className="login-form" >
        <h1> Login </h1>
        <label>
            <input type="email" placeholder="Email" name="email" value={formState.email} onChange={handleChange}></input>
        </label>
        <label>
            <input type="password" placeholder="Password" name="password" value={formState.password} onChange={handleChange}></input>
        </label>
        <section className="account-btns">
            <button type="submit"> LOGIN </button>
        </section>

        {/* Conditional error message */}
        {error && (
            <section className="form-error">
                {error.message}
            </section>
        )}
    </form>
    )
}