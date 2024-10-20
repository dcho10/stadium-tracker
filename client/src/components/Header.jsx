// Set up imports
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import AuthService from "../utils/auth";
import "./Header.css"

export default function Header() {
    // Set up states
    const [isLoggedIn, setIsLoggedIn] = useState(AuthService.loggedIn());
    const [userId, setUserId] = useState(null);

    const navigate = useNavigate();

    // Set up logout logic - revert to login header, and navigate back to home
    const logout = (event) => {
        event.preventDefault();
        AuthService.logout();
        setIsLoggedIn(false);
        navigate("/");
    }

    // If the user successfully logs in, AuthService will fetch the user information
    useEffect(() => {
        if (isLoggedIn) {
            const user = AuthService.getUser();
            setUserId(user?.data?._id);
        }

        const handleAuthChange = () => {
            setIsLoggedIn(AuthService.loggedIn());
        };

        window.addEventListener("authChange", handleAuthChange);

        return () => {
            window.removeEventListener("authChange", handleAuthChange);
        }
    }, []);

    return (
        <>
        <header className="header">
            <h1><a href="/"> Visitour </a></h1>
            {/* Logged in conditional rendering */}
            <section className="header-links">
                {isLoggedIn ? (
                    <section className="header-links">
                        <ul>
                            <li><a href="/welcome"> Leagues </a></li>
                            <li><a href={`/profile/${userId}`}> Profile </a></li>
                            <li><button type="button" onClick={logout}> Logout </button></li>
                        </ul>
                    </section>
                    ) : (
                        // If not logged in, render these links instead
                        <ul>
                            <li><a href="/signup"> Sign Up </a></li>
                            <li><a href="/login"> Login </a></li>
                        </ul>
                    )}
            </section>
        </header>
        </>
    )
}