// Set up imports
import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { QUERY_USER, QUERY_NFL } from "../utils/queries";
import { ADD_NFL_VISIT } from "../utils/mutations";
import AuthService from "../utils/auth";

import "./NFL.css"
import NFLLogo from "../assets/nfl-logo.svg"

export default function NFL() {
  // Fetch user data and create ID and firstName values
  const user = AuthService.getUser();
  const userId = user.data._id;
  const firstName = user.data.firstName
  
  // User query to fetch user info based on the user ID
  const { loading: loadingUser, error: errorUser, data: userData } = useQuery(QUERY_USER, {
    variables: { userId },
  })

  // NFL data query to fetch all NFL stadiums
  const { loading: loadingNFL, error: errorNFL, data: nflData } = useQuery(QUERY_NFL)
  const stadiums = nflData?.nflStadiums || [];

  // Set up initial states
  const [visitedStadiums, setVisitedStadiums] = useState({});
  const [selectedStadium, setSelectedStadium] = useState(null);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [dateVisited, setDateVisited] = useState(null);
  const [viewVisit, setViewVisit] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState(false);

  // Add NFL visit mutation
  const [addNFLVisit] = useMutation(ADD_NFL_VISIT);

  // Update the state based on whether a stadium has been visited or not (visited = green, not-visited = red)
  useEffect(() => {
    if (userData?.user?.footballStadiums) {
      const visited = {};
      userData.user.footballStadiums.forEach((stadium) => {
        if (stadium.hasVisited) {
          visited[stadium.stadiumId] = true;
        }
      });
      setVisitedStadiums(visited);
    }
  }, [userData]);
  
  // If a user has visited a stadium, the user will be able to view the date they inputted, otherwise asked to enter a date for a stadium they want to add
  const handleStadiumChange = (stadium) => {
    if (visitedStadiums[stadium._id]) {
      const visit = userData.user.footballStadiums.find(
        (s) => s.stadiumId === stadium._id && s.hasVisited
      );
      if (visit) {
        setSelectedVisit(visit);
        setViewVisit(true); 
      }
      return;
    }
    setSelectedStadium(stadium);
    setCalendarVisible(true);
  };

  // When the user selects a date, they cannot select any days greater than the current day (i.e. can't pick future dates), the date they selected will be inputted into the database and the calendar will close
  const handleSubmitDate = async (date) => {
    const today = new Date();
    if (date > today) {
      return;
    }
    setDateVisited(date);
    setCalendarVisible(false);

    // Variables required for adding NFL visit
    try {
      await addNFLVisit({
        variables: {
          userId,
          stadiumId: selectedStadium._id,
          dateVisited: date.toISOString(),
        }
      })
    } catch (err) {
      console.error("Error adding visit", err)
    }
  }

// Created groups based on the conferences the each team is in
const conferenceGroups = {
  "AFC East": [],
  "AFC North": [],
  "AFC South": [],
  "AFC West": [],
  "NFC East": [],
  "NFC North": [],
  "NFC South": [],
  "NFC West": [],
};

// Group the conference with their division
stadiums.forEach((stadium) => {
  const { conference, division } = stadium;
  const groupKey = `${conference} ${division}`;  

  if (conferenceGroups[groupKey]) {
    conferenceGroups[groupKey].push(stadium);
  }
});

// Sort the stadiums in alphabetical order for each conference
Object.keys(conferenceGroups).forEach((group) => {
  conferenceGroups[group].sort((a, b) => a.stadiumName.localeCompare(b.stadiumName));
});

return (
  <section className="nfl-stadiums">
    <div className="logo-container">
      <img src={NFLLogo} alt="NFL Logo" />
    </div>
    <h1> {firstName}, which stadiums have you recently visited? </h1>

    {/* Map all AFC conferences */}
    <section className="nfl-container">
      <section className="nfl-row">
        {["AFC East", "AFC North", "AFC South", "AFC West"].map((division) => (
          <section className="nfl-list" key={division}>
            <h2>{division}</h2>
            {/* Map all AFC teams in alphabetical order based on the division */}
            {conferenceGroups[division].map((stadium) => (
              <section className="nfl-item" key={stadium._id}>
                {/* Visited state conditional rendering */}
                <button
                  type="button"
                  className={`button button-effect ${visitedStadiums[stadium._id] ? "visited" : "not-visited"}`}
                  onClick={() => handleStadiumChange(stadium)}
                >
                  {stadium.stadiumName} - {stadium.teamName}
                </button>
              </section>
            ))}
          </section>
        ))}
      </section>
    </section>

    <section className="nfl-container">
      <section className="nfl-row">
        {/* Map all NFC divisions*/}
        {["NFC East", "NFC North", "NFC South", "NFC West"].map((division) => (
          <section className="nfl-list" key={division}>
            <h2>{division}</h2>
            {/* Map all NFC teams in alphabetical order based on the division */}
            {conferenceGroups[division].map((stadium) => (
              <section className="nfl-item" key={stadium._id}>
                {/* Visited state conditional rendering */}
                <button
                  type="button"
                  className={`button button-effect ${visitedStadiums[stadium._id] ? "visited" : "not-visited"}`}
                  onClick={() => handleStadiumChange(stadium)}
                >
                  {stadium.stadiumName} - {stadium.teamName}
                </button>
              </section>
            ))}
          </section>
        ))}
      </section>
    </section>

    {/* React Calendar */}
    {calendarVisible && (
      <>
        <div className="calendar-overlay" onClick={() => setCalendarVisible(false)}></div>
        <div className="calendar-popup">
          <h4> Which day did you visit {selectedStadium.stadiumName}? </h4>
          <Calendar onChange={handleSubmitDate} value={dateVisited} maxDate={new Date()} />
        </div>
      </>
    )}

    {/* View a visit */}
    {viewVisit && (
      <>
      <section className="calendar-overlay" onClick={() => setViewVisit(false)}></section>
          <section className="view-visit">
            <h2>
              You visited {selectedVisit.stadiumName} on{" "}
              {new Date(parseInt(selectedVisit.dateVisited)).toLocaleDateString('en-US', { 
                month: 'long', day: 'numeric', year: 'numeric' })}
            </h2>
            <p> To edit or delete, please go to your profile </p>
          </section>
      </>
    )}
  </section>
);
}

