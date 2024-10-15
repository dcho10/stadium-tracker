import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import AuthService from "../utils/auth";

import "./Welcome.css";

import MLBLogo from "../assets/mlb-logo.svg";
import NBALogo from "../assets/nba-logo.svg";
import NFLLogo from "../assets/nfl-logo.svg";
import NHLLogo from "../assets/nhl-logo.svg";

export default function Welcome() {
    const user = AuthService.getUser();

    const userId = user.data._id;

    const firstName = user.data.firstName;
    
    const { loading, error, data } = useQuery(QUERY_USER, {
        variables: { userId },
    })

    console.log(data);
    
    return (
        <>
        <section className="leagues">
            <h1> Welcome, {firstName}!</h1>
            <p> Which league would you like to visit? </p>
            <section className="league-links">
                <a href="/nfl"><img src={NFLLogo} alt="NFL Logo"/></a>
                <a href="/nba"><img src={NBALogo} alt="NBA Logo"/></a>
                <a href="/mlb"><img src={MLBLogo} alt="MLB Logo"/></a>
                <a href="/nhl"><img src={NHLLogo} alt="NHL Logo"/></a>
            </section>
        </section>
        </>
    )
}