import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import AuthService from "../utils/auth";
import "./Header.css"

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(AuthService.loggedIn());
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    const logout = (event) => {
        event.preventDefault();
        AuthService.logout();
        setIsLoggedIn(false);
        navigate("/");
    }

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