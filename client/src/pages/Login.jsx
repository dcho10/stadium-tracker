import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";

import "./Signup.css";

export default function Login() {
    const [formState, setFormState ] = useState({
        email: "",
        password: ""
    });
    const [login, {error, data }] = useMutation(LOGIN);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log("formState:", formState);

        try {
            const { data } = await login({
                variables: { ...formState },
            });

            Auth.login(data.login.token);

            console.log("Successful login:", data)
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
        <h3> Login </h3>
        <section>
            <h4> Email </h4>
            <input type="email" placeholder="Email" name="email" value={formState.email} onChange={handleChange}></input>
        </section>
        <section>
            <h4> Password </h4>
            <input type="password" placeholder="Password" name="password" value={formState.password} onChange={handleChange}></input>
        </section>
        <section className="account-btns">
            <button type="button"><a href="/signup"> Sign Up </a></button>
            <button type="submit"> Login </button>
        </section>
        {error && (
                <section className="form-error">
                  {error.message}
                </section>
        )}
    </form>
    )
}