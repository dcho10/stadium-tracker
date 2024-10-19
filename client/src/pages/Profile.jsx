import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { EDIT_MLB_VISIT, EDIT_NBA_VISIT, EDIT_NFL_VISIT, EDIT_NHL_VISIT, DELETE_MLB_VISIT, DELETE_NBA_VISIT, DELETE_NFL_VISIT, DELETE_NHL_VISIT } from "../utils/mutations";
import Calendar from "react-calendar";
import AuthService from "../utils/auth";

import ProfileIcon from "../assets/profile-icon.png";
import NBALogo from "../assets/nba-logo.svg";
import NFLLogo from "../assets/nfl-logo.svg";
import MLBLogo from "../assets/mlb-logo.svg";
import NHLLogo from "../assets/nhl-logo.svg";

import "./Profile.css";

export default function Profile() {
  const user = AuthService.getUser();
  const userId = user.data._id;

  const { loading, error, data } = useQuery(QUERY_USER, {
    variables: { userId },
  });

  const userData = data?.user || {};
  const firstName = user.data.firstName;
  const lastName = user.data.lastName;

  const [viewVisit, setViewVisit] = useState(false);
  const [viewCalendar, setViewCalendar] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [editDate, setEditDate] = useState(null);

  const [leagues, setLeagues] = useState({
    MLB: [],
    NBA: [],
    NFL: [],
    NHL: [],
  });

  const [editMLBVisit] = useMutation(EDIT_MLB_VISIT);
  const [editNBAVisit] = useMutation(EDIT_NBA_VISIT);
  const [editNFLVisit] = useMutation(EDIT_NFL_VISIT);
  const [editNHLVisit] = useMutation(EDIT_NHL_VISIT);

  const [deleteMLBVisit] = useMutation(DELETE_MLB_VISIT);
  const [deleteNFLVisit] = useMutation(DELETE_NFL_VISIT);
  const [deleteNBAVisit] = useMutation(DELETE_NBA_VISIT);
  const [deleteNHLVisit] = useMutation(DELETE_NHL_VISIT);

  const mutationMap = {
    MLB: editMLBVisit,
    NBA: editNBAVisit,
    NFL: editNFLVisit,
    NHL: editNHLVisit,
  };

  const deleteMap = {
    MLB: deleteMLBVisit,
    NBA: deleteNBAVisit,
    NFL: deleteNFLVisit,
    NHL: deleteNHLVisit,
  };

  useEffect(() => {
    if (userData) {
      const newLeagues = {
        MLB: [],
        NBA: [],
        NFL: [],
        NHL: [],
      };

      userData.baseballStadiums?.forEach((stadium) => newLeagues.MLB.push({ ...stadium, league: "MLB" }));
      userData.basketballStadiums?.forEach((stadium) => newLeagues.NBA.push({ ...stadium, league: "NBA" }));
      userData.footballStadiums?.forEach((stadium) => newLeagues.NFL.push({ ...stadium, league: "NFL" }));
      userData.hockeyStadiums?.forEach((stadium) => newLeagues.NHL.push({ ...stadium, league: "NHL" }));

      Object.keys(newLeagues).forEach((league) => {
        newLeagues[league].sort((a, b) => {
          const dateA = new Date(parseInt(a.dateVisited)).getTime();
          const dateB = new Date(parseInt(b.dateVisited)).getTime();
          return dateA - dateB;
        });
      });

      setLeagues(newLeagues);
    }
  }, [userData]); // Populate leagues only once after data is fetched

  const handleViewVisit = async (stadium) => {
    setSelectedVisit(stadium);
    setViewVisit(true);
  };

  const handleEdit = async (stadium) => {
    setViewCalendar(true);
  };

  const handleEditDate = async (date) => {
    const today = new Date();
    if (date > today) {
      return;
    }
    setEditDate(date);
    setViewCalendar(false);

    try {
      const isoDate = date.toISOString();
      const stadiumLeague = selectedVisit.league;

      const editVisit = mutationMap[stadiumLeague];

      await editVisit({
        variables: {
          userId,
          stadiumId: selectedVisit.stadiumId,
          dateVisited: isoDate,
        },
      });

      setSelectedVisit((prev) => ({
        ...prev,
        dateVisited: date.getTime(),
      }));
    } catch (err) {
      console.error("Error editing visit", err);
    }
  };

  const deleteVisit = async (stadium) => {
    try {
      const stadiumLeague = selectedVisit.league;

      const deleteVisit = deleteMap[stadiumLeague];

      await deleteVisit({
        variables: {
          userId,
          stadiumId: selectedVisit.stadiumId,
        },
      });

      setLeagues((prevLeagues) => ({
        ...prevLeagues,
        [stadiumLeague]: prevLeagues[stadiumLeague].filter(
          (s) => s.stadiumId !== selectedVisit.stadiumId
        ),
      }));

      setViewVisit(false);
    } catch (err) {
      console.error("Error deleting visit", err);
    }
  };

  const renderStadiums = (leagueName, stadiums, logo) => (
    <section className="visited-stadiums">
      <section className="profile-logo-container">
        <img src={logo} alt={`${leagueName} Logo`} />
      </section>
      {stadiums.length > 0 ? (
        <>
          <p>You visited these {leagueName} stadiums:</p>
          <ul className="visited-list">
            {stadiums.map((stadium, index) => (
              <li key={`${leagueName}-${stadium.stadiumId}-${index}`}>
                <button
                  type="button"
                  onClick={() => handleViewVisit(stadium)}
                  className="button button-effect"
                >
                  {stadium.stadiumName} - {stadium.teamName}
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>You haven't visited any {leagueName} stadiums yet.</p>
      )}
    </section>
  );

  return (
    <>
      <section className="profile-container">
        <section className="profile-info">
          <img src={ProfileIcon} alt="Profile icon" />
          <h1>
            {firstName} {lastName}
          </h1>
        </section>

        <section className="visited-container">
          {renderStadiums("NFL", leagues.NFL, NFLLogo)}
          {renderStadiums("NBA", leagues.NBA, NBALogo)}
          {renderStadiums("MLB", leagues.MLB, MLBLogo)}
          {renderStadiums("NHL", leagues.NHL, NHLLogo)}
        </section>

        {viewVisit && (
          <>
            <section className="calendar-overlay" onClick={() => setViewVisit(false)}></section>
            <section className="view-visit">
              <h2>
                You visited {selectedVisit.stadiumName} on{" "}
                {new Date(parseInt(selectedVisit.dateVisited)).toLocaleDateString('en-US', { 
                  month: 'long', day: 'numeric', year: 'numeric' })}
              </h2>
              <section className="visit-actions">
                <button type="button" onClick={handleEdit}>Edit</button>
                <button type="button" onClick={deleteVisit}>Delete</button>
              </section>
            </section>

            {viewCalendar && (
              <div className="calendar-popup">
                <h4> Which day did you visit {selectedVisit.stadiumName}? </h4>
                <Calendar onChange={handleEditDate} value={editDate} maxDate={new Date()} />
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
