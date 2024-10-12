import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

import "./Signup.css"

export default function Signup() {
    const [formState, setFormState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [addUser, { error }] = useMutation(ADD_USER);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        })
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addUser({
                variables: { ...formState },
            });

            Auth.login(data.addUser.token);

            console.log("Sign up successful:", data)
            navigate("/welcome");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <form onSubmit={handleFormSubmit}className="signup-form">
                <h1> Sign Up </h1>
                <section>
                    <h2> First Name* </h2>
                    <input type="text" placeholder="First Name" name="firstName" value={formState.firstName} onChange={handleChange}></input>
                </section>
                <section>
                    <h2> Last Name </h2>
                    <input type="text" placeholder="Last Name" name="lastName" value={formState.lastName} onChange={handleChange}></input>
                </section>
                <section>
                    <h2> Email* </h2>
                    <input type="text" placeholder="Email" name="email" value={formState.email} onChange={handleChange}></input>
                </section>
                <section>
                    <h2> Password* </h2>
                    <input type="password" placeholder="Password" name="password" value={formState.password} onChange={handleChange}></input>
                </section>
                <p> *Required </p>
                <section className="account-btns">
                    <button type="submit"> Sign Up</button>
                </section>
                {error && (
                <section className="form-error">
                  {error.message}
                </section>
              )}
            </form>
        </>
    )
}