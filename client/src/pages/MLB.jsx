// Set up imports
import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { QUERY_USER, QUERY_MLB } from "../utils/queries";
import { ADD_MLB_VISIT } from "../utils/mutations";
import AuthService from "../utils/auth";

import "./MLB.css"
import MLBLogo from "../assets/mlb-logo.svg"

export default function MLB() {
  // Fetch user data and create ID and firstName values
  const user = AuthService.getUser();
  const userId = user.data._id;
  const firstName = user.data.firstName
  
  // User query to fetch user info based on the user ID
  const { loading: loadingUser, error: errorUser, data: userData } = useQuery(QUERY_USER, {
    variables: { userId },
  })

  // NBA data query to fetch all MLB stadiums
  const { loading: loadingMLB, error: errorMLB, data: mlbData } = useQuery(QUERY_MLB)
  const stadiums = mlbData?.mlbStadiums || [];

  // Set up initial states
  const [visitedStadiums, setVisitedStadiums] = useState({});
  const [selectedStadium, setSelectedStadium] = useState(null);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [dateVisited, setDateVisited] = useState(null);
  const [viewVisit, setViewVisit] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState(false);

  // Add MLB visit mutation
  const [addMLBVisit] = useMutation(ADD_MLB_VISIT);

  // Update state based on whether a stadium has been visited or not
  useEffect(() => {
    if (userData?.user?.baseballStadiums) {
      const visited = {};
      userData.user.baseballStadiums.forEach((stadium) => {
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
      const visit = userData.user.baseballStadiums.find(
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
      await addMLBVisit({
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
    "AL East": [],
    "AL Central": [],
    "AL West": [],
    "NL East": [],
    "NL Central": [],
    "NL West": [],
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
    <section className="mlb-stadiums">
      <div className="logo-container">
        <img src={MLBLogo} alt="MLB Logo" />
      </div>
      <h1> {firstName}, which stadiums have you recently visited? </h1>

      <section className="mlb-container">
        <section className="mlb-row">
          {/* Map all American League divisions */}
          {["AL East", "AL Central", "AL West"].map((division) => (
            <section className="mlb-list" key={division}>
              <h2>{division}</h2>
              {/* Map all stadiums in that division in alphabetical order */}
              {divisionGroups[division].map((stadium) => (
                <section className="mlb-item" key={stadium._id}>
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

      <section className="mlb-container">
        <section className="mlb-row">
          {/* Map all National League divisions */}
          {["NL East", "NL Central", "NL West"].map((division) => (
            <section className="mlb-list" key={division}>
              <h2>{division}</h2>
              {/* Map all statiums in that division in alphabetical order */}
              {divisionGroups[division].map((stadium) => (
                <section className="mlb-item" key={stadium._id}>
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
          <section className="calendar-overlay" onClick={() => setCalendarVisible(false)}></section>
          <section className="calendar-popup">
            <h4> Which day did you visit {selectedStadium.stadiumName}? </h4>
            <Calendar onChange={handleSubmitDate} value={dateVisited} maxDate={new Date()} />
          </section>

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