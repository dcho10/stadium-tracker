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
    
    return (
        <>
        <section className="leagues">
            <h5> Welcome, {firstName}!</h5>
            <h6> Which league would you like to visit? </h6>
            <section className="league-links">
                <a href="/nfl"><img src={NFLLogo}/></a>
                <a href="/nba"><img src={NBALogo}/></a>
                <a href="/mlb"><img src={MLBLogo}/></a>
                <a href="/nhl"><img src={NHLLogo}/></a>
            </section>
        </section>
        </>
    )
}