// Set up imports
import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { QUERY_USER, QUERY_NHL } from "../utils/queries";
import { ADD_NHL_VISIT } from "../utils/mutations";
import AuthService from "../utils/auth";

import "./NHL.css"
import NHLLogo from "../assets/nhl-logo.svg"

export default function NHL() {
  // Fetch user data and create ID and firstName values                                                   
  const user = AuthService.getUser();
  const userId = user.data._id;
  const firstName = user.data.firstName
  
  // User query to fetch user info based on the user ID
  const { loading: loadingUser, error: errorUser, data: userData } = useQuery(QUERY_USER, {
    variables: { userId },
  })

  // NBA data query to fetch all NHL stadiums
  const { loading: loadingNHL, error: errorNHL, data: nhlData } = useQuery(QUERY_NHL)
  console.log(nhlData)
  const stadiums = nhlData?.nhlStadiums || [];

  // Set up initial states
  const [visitedStadiums, setVisitedStadiums] = useState({});
  const [selectedStadium, setSelectedStadium] = useState(null);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [dateVisited, setDateVisited] = useState(null);
  const [viewVisit, setViewVisit] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState(false);

  // Add NHL visit mutation
  const [addNHLVisit] = useMutation(ADD_NHL_VISIT);

  // Update state based on whether a stadium has been visited or not
  useEffect(() => {
    if (userData?.user?.hockeyStadiums) {
      const visited = {};
      userData.user.hockeyStadiums.forEach((stadium) => {
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
      const visit = userData.user.hockeyStadiums.find(
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

    // Variables requried for adding NHL visit
    try {
      await addNHLVisit({
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
    "Metropolitan": [],
    "Central": [],
    "Pacific": [],
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
    <section className="nhl-stadiums">
      <div className="logo-container">
        <img src={NHLLogo} alt="NHL Logo" />
      </div>
      <h1> {firstName}, which stadiums have you recently visited? </h1>

      <section className="nhl-container">
        <section className="nhl-row">
          {/* Map all Eastern Conference divisions */}
          {["Atlantic", "Metropolitan"].map((division) => (
            <section className="nhl-list" key={division}>
              <h2>{division}</h2>
              {/* Map all stadiums in that division in alphabetical order */}
              {divisionGroups[division].map((stadium) => (
                <section className="nhl-item" key={stadium._id}>
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

      <section className="nhl-container">
        <section className="nhl-row">
          {/* Map all Western Conference divisions */}
          {["Central", "Pacific"].map((division) => (
            <section className="nhl-list" key={division}>
              <h2>{division}</h2>
              {/* Map all statiums in that division in alphabetical order */}
              {divisionGroups[division].map((stadium) => (
                <section className="nhl-item" key={stadium._id}>
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