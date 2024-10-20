// Set up imports
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import AuthService from "../utils/auth";

import "./Welcome.css";

// Import logos
import MLBLogo from "../assets/mlb-logo.svg";
import NBALogo from "../assets/nba-logo.svg";
import NFLLogo from "../assets/nfl-logo.svg";
import NHLLogo from "../assets/nhl-logo.svg";

export default function Welcome() {
    // Fetch user data and create ID and firstName values
    const user = AuthService.getUser();
    const userId = user.data._id;
    const firstName = user.data.firstName;
    
    // User query to fetch the user data
    const { loading, error, data } = useQuery(QUERY_USER, {
        variables: { userId },
    })
    
    return (
        <>
        {/* Render icons */}
        <section className="leagues">
            <h1> Welcome, {firstName}!</h1>
            <p> Which league would you like to visit? </p>
            <section className="league-links">
                <ul>
                    <li><a href="/nfl"><img src={NFLLogo} alt="NFL Logo"/></a></li>
                    <li><a href="/nba"><img src={NBALogo} alt="NBA Logo"/></a></li>
                    <li><a href="/mlb"><img src={MLBLogo} alt="MLB Logo"/></a></li>
                    <li><a href="/nhl"><img src={NHLLogo} alt="NHL Logo"/></a></li>
                </ul>
            </section>
        </section>
        </>
    )
}