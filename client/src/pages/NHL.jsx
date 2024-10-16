import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { QUERY_USER, QUERY_NHL } from "../utils/queries";
import { ADD_NHL_VISIT } from "../utils/mutations";
import AuthService from "../utils/auth";

import "./NHL.css"
import NHLLogo from "../assets/nhl-logo.svg"

export default function NHL() {
  const user = AuthService.getUser();
  const userId = user.data._id;
  const firstName = user.data.firstName
  
  const { loading: loadingUser, error: errorUser, data: userData } = useQuery(QUERY_USER, {
    variables: { userId },
  })

  const { loading: loadingNHL, error: errorNHL, data: nhlData } = useQuery(QUERY_NHL)
  const stadiums = nhlData?.nhlStadiums || [];

  const [visitedStadiums, setVisitedStadiums] = useState({});
  const [selectedStadium, setSelectedStadium] = useState(null);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [dateVisited, setDateVisited] = useState(null);

  const [addNHLVisit] = useMutation(ADD_NHL_VISIT);

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
  
  const handleStadiumChange = (stadium) => {
    if (visitedStadiums[stadium._id]) return;
    setSelectedStadium(stadium);
    setCalendarVisible(true);
  }

  const handleSubmitDate = async (date) => {
    const today = new Date();
    if (date > today) {
      return;
    }
    setDateVisited(date);
    setCalendarVisible(false);

    try {
      await addNHLVisit({
        variables: {
          userId,
          stadiumId: selectedStadium._id,
          dateVisited: date.toISOString(),
        }
      });

      setVisitedStadiums((prev) => ({
        ...prev,
        [selectedStadium._id]: true, 
      }));

    } catch (err) {
      console.error("Error adding visit", err)
    }
  }

  const divisionGroups = {
    "Atlantic": [],
    "Metropolitan": [],
    "Central": [],
    "Pacific": [],
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
    <section className="nhl-stadiums">
    <div className="logo-container">
      <img src={NHLLogo} alt="NHL Logo" />
    </div>
      <h1> {firstName}, which stadiums have you recently visited? </h1>

      <section className="nhl-container">
        <section className="nhl-row">
          {["Atlantic", "Metropolitan"].map((division) => (
            <section className="nhl-list" key={division}>
              <h2>{division}</h2>
              {divisionGroups[division].map((stadium) => (
                <section className="nhl-item" key={stadium._id}>
                  <button
                    type="button"
                    className={visitedStadiums[stadium._id] ? "visited" : "not-visited"}
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
          {["Central", "Pacific"].map((division) => (
            <section className="nhl-list" key={division}>
              <h2>{division}</h2>
              {divisionGroups[division].map((stadium) => (
                <section className="nhl-item" key={stadium._id}>
                  <button
                    type="button"
                    className={visitedStadiums[stadium._id] ? "visited" : "not-visited"}
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
          <div className="calendar-overlay" onClick={() => setCalendarVisible(false)}></div>
          <div className="calendar-popup">
            <h4> Which day did you visit {selectedStadium.stadiumName}? </h4>
            <Calendar onChange={handleSubmitDate} value={dateVisited} maxDate={new Date()} />
          </div>

        </>
      )}
    </section>
    </>
  )
}