// import { Link, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Auth from "../utils/auth";
import "./Header.css"

export default function Header() {
    return (
        <>
        <header className="header">
            <h1><a href="/"> Visitour </a></h1>
            <section className="header-links">
                <ul>
                    <li><a href="/login"> Login</a></li>
                    <li><a href="/signup"> Sign Up</a></li>
                </ul>
            </section>
        </header>
        </>
    )
}