// Set up imports
import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { QUERY_USER, QUERY_NBA } from "../utils/queries";
import { ADD_NBA_VISIT } from "../utils/mutations";
import AuthService from "../utils/auth";

import "./NBA.css"
import NBALogo from "../assets/nba-logo.svg"

export default function NBA() {
  // Fetch user data and create ID and firstName values
  const user = AuthService.getUser();
  const userId = user.data._id;
  const firstName = user.data.firstName
  
  // User query to fetch user info based on the user ID
  const { loading: loadingUser, error: errorUser, data: userData } = useQuery(QUERY_USER, {
    variables: { userId },
  })

  // NBA data query to fetch all NBA stadiums
  const { loading: loadingNBA, error: errorNBA, data: nbaData } = useQuery(QUERY_NBA)
  const stadiums = nbaData?.nbaStadiums || [];

  // Set up initial states
  const [visitedStadiums, setVisitedStadiums] = useState({});
  const [selectedStadium, setSelectedStadium] = useState(null);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [dateVisited, setDateVisited] = useState(null);
  const [viewVisit, setViewVisit] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState(false);

  // Add NBA visit mutation
  const [addNBAVisit] = useMutation(ADD_NBA_VISIT);

  // Update state based on whether a stadium has been visited or not
  useEffect(() => {
    if (userData?.user?.basketballStadiums) {
      const visited = {};
      userData.user.basketballStadiums.forEach((stadium) => {
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
      const visit = userData.user.basketballStadiums.find(
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

  // When the user selects a date, they cannot select any days greater than the current day (i.e. can't pick future dates), the date they selected will be inputted into the database an the calendar will close
  const handleSubmitDate = async (date) => {
    const today = new Date();
    if (date > today) {
      return;
    }
    setDateVisited(date);
    setCalendarVisible(false);

    // Variables requried for adding NBA visit
    try {
      await addNBAVisit({
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

  // Created groups based on the division the team is in
  const divisionGroups = {
    "Atlantic": [],
    "Central": [],
    "Southeast": [],
    "Northwest": [],
    "Pacific": [],
    "Southwest": [],
  };

  // Add the stadium to the corresponding division array
  stadiums.forEach((stadium) => {
    const { division } = stadium;
    if (divisionGroups[division]) {
      divisionGroups[division].push(stadium);
    }
  });

  // Sort the stadiums in alphabetical order for each division
  Object.keys(divisionGroups).forEach((division) => {
    divisionGroups[division].sort((a, b) => a.stadiumName.localeCompare(b.stadiumName));
  });

  return (
    <>
    <section className="nba-stadiums">
      <div className="logo-container">
        <img src={NBALogo} alt="NBA Logo" />
      </div>
      <h1> {firstName}, which stadiums have you recently visited? </h1>

      <section className="nba-container">
        <section className="nba-row">
          {/* Map all Eastern Conference divisions */}
          {["Atlantic", "Central", "Southeast"].map((division) => (
            <section className="nba-list" key={division}>
              <h2>{division}</h2>
              {/* Map all stadiums in that division in alphabetical order */}
              {divisionGroups[division].map((stadium) => (
                <section className="nba-item" key={stadium._id}>
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

      <section className="nba-container">
        <section className="nba-row">
          {/* Map all Western Conference divisions */}
          {["Northwest", "Southwest", "Pacific"].map((division) => (
            <section className="nba-list" key={division}>
              <h2>{division}</h2>
              {/* Map all statiums in that division in alphabetical order */}
              {divisionGroups[division].map((stadium) => (
                <section className="nba-item" key={stadium._id}>
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
    </>
  )
}