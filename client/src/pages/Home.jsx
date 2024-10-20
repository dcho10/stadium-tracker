// Set up imports
import { useEffect, useState } from "react";
import AuthService from "../utils/auth";

import "./Home.css"

export default function Home() {

    // Set up scoreboard's score state values and logged in statate
    const [welcomeScore, setWelcomeScore] = useState(0);
    const [visitorScore, setVisitorScore] = useState(0);
    const [animateScore, setAnimateScore] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // When the user loads the page, visitor score goes to 1 and the animation occurs
    // If the user is logged in, the buttons will not render when they go to the home page
    useEffect(() => {
        const checkLoginStatus = () => {
            setIsLoggedIn(AuthService.loggedIn());
        };

        checkLoginStatus();

        setTimeout(() => {
            setVisitorScore(1);
            setAnimateScore(true);
    
            // Reset the animation after a short delay
            setTimeout(() => {
                setAnimateScore(false);
            }, 1500); 
        }, 800);
    }, []);
        

    return (
        <>
        <section className="welcome">
            
            <section className="scoreboard">
                <section className="home team">
                    <h1> WELCOME </h1>
                    <section className="score"> {welcomeScore} </section>
                </section>
                <span> : </span>
                <section className="home team">
                    <h1> VISITOR </h1>
                    <section className={`score ${animateScore ? "animated" : ""}`}>
                        {visitorScore}
                    </section>
                </section>
            </section>
            
            {/* Conditionally render buttons based on if user is logged in or not */}
            {!isLoggedIn ? (
                <section className="login-signup">
                    <button type="button"><a href="/signup"> Sign Up </a></button>
                    <button type="button"><a href="/login"> Login </a></button>
                </section>
            ) : null}
        </section>
        </>
    )
}