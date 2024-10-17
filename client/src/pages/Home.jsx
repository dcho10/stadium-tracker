import { useEffect, useState } from "react";

import "./Home.css"

export default function Home() {

    const [welcomeScore, setHomeScore] = useState(0);
    const [visitorScore, setVisitorScore] = useState(0);
    const [animateScore, setAnimateScore] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setVisitorScore(1);
            setAnimateScore(true);
    
            // Reset the animation after a short delay
            setTimeout(() => {
                setAnimateScore(false);
            }, 1500); // Match this time with your CSS animation duration (1.5 seconds)
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
                    <h1> VISITOUR </h1>
                    <section className={`score ${animateScore ? "animated" : ""}`}>
                        {visitorScore}
                    </section>
                </section>
            </section>

            <section className="login-signup">
                <button type="button"><a href="/signup"> Sign Up </a></button>
                <button type="button"><a href="/login"> Login </a></button>
            </section>
        </section>
        </>
    )
}