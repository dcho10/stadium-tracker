import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { QUERY_USER, QUERY_MLB } from "../utils/queries";
import { ADD_MLB_VISIT } from "../utils/mutations";
import AuthService from "../utils/auth";

import "./MLB.css"
import MLBLogo from "../assets/mlb-logo.svg"

export default function MLB() {
  const user = AuthService.getUser();
  const userId = user.data._id;
  const firstName = user.data.firstName
  
  const { loading: loadingUser, error: errorUser, data: userData } = useQuery(QUERY_USER, {
    variables: { userId },
  })

  const { loading: loadingMLB, error: errorMLB, data: mlbData } = useQuery(QUERY_MLB)
  console.log(mlbData)
  const stadiums = mlbData?.mlbStadiums || [];

  const [visitedStadiums, setVisitedStadiums] = useState({});
  const [selectedStadium, setSelectedStadium] = useState(null);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [dateVisited, setDateVisited] = useState(null);
  const [viewVisit, setViewVisit] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState(false);

  const [addMLBVisit] = useMutation(ADD_MLB_VISIT);

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
  
  const handleSubmitDate = async (date) => {
    const today = new Date();
    if (date > today) {
      return;
    }
    setDateVisited(date);
    setCalendarVisible(false);

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

  const divisionGroups = {
    "AL East": [],
    "AL Central": [],
    "AL West": [],
    "NL East": [],
    "NL Central": [],
    "NL West": [],
  };

  stadiums.forEach((stadium) => {
    const { division } = stadium;
    if (divisionGroups[division]) {
      divisionGroups[division].push(stadium);
    }
  });

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
          {["AL East", "AL Central", "AL West"].map((division) => (
            <section className="mlb-list" key={division}>
              <h2>{division}</h2>
              {divisionGroups[division].map((stadium) => (
                <section className="mlb-item" key={stadium._id}>
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
          {["NL East", "NL Central", "NL West"].map((division) => (
            <section className="mlb-list" key={division}>
              <h2>{division}</h2>
              {divisionGroups[division].map((stadium) => (
                <section className="mlb-item" key={stadium._id}>
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
      
      {calendarVisible && (
        <>
          <section className="calendar-overlay" onClick={() => setCalendarVisible(false)}></section>
          <section className="calendar-popup">
            <h4> Which day did you visit {selectedStadium.stadiumName}? </h4>
            <Calendar onChange={handleSubmitDate} value={dateVisited} maxDate={new Date()} />
          </section>

        </>
      )}

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