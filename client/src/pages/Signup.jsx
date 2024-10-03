import { useState } from "react";
import { useNavigate} from "react-router-dom";
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

        navigate("/");
    } catch (err) {
        console.error(err);
    }
};

    return (
        <>
            <form onSubmit={handleFormSubmit}className="signup-form">
                <h3> Sign Up </h3>
                <section>
                    <h4> First Name* </h4>
                    <input type="text" placeholder="First Name" name="firstName" value={formState.firstName} onChange={handleChange}></input>
                </section>
                <section>
                    <h4> Last Name </h4>
                    <input type="text" placeholder="Last Name" name="lastName" value={formState.lastName} onChange={handleChange}></input>
                </section>
                <section>
                    <h4> Email* </h4>
                    <input type="text" placeholder="Email" name="email" value={formState.email} onChange={handleChange}></input>
                </section>
                <section>
                    <h4> Password* </h4>
                    <input type="password" placeholder="Password" name="password" value={formState.password} onChange={handleChange}></input>
                </section>
                <p> *Required </p>
                <section className="account-btns">
                    <button type="submit"> Sign Up</button>
                    <button type="button"><a href="/login"> Login </a></button>
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