import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { QUERY_USER, QUERY_NBA } from "../utils/queries";
import { ADD_NBA_VISIT } from "../utils/mutations";
import AuthService from "../utils/auth";

import "./NBA.css"

export default function NBA() {
  const user = AuthService.getUser();
  const userId = user.data._id;
  const firstName = user.data.firstName
  
  const { loading: loadingUser, error: errorUser, data: userData } = useQuery(QUERY_USER, {
    variables: { userId },
  })

  const { loading: loadingNBA, error: errorNBA, data: nbaData } = useQuery(QUERY_NBA)
  const stadiums = nbaData?.nbaStadiums || [];

  const [visitedStadiums, setVisitedStadiums] = useState({});
  const [selectedStadium, setSelectedStadium] = useState(null);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [dateVisited, setDateVisited] = useState(null);
  const [visitedCount, setVisitedCount] = useState(0);

  const [addNBAVisit] = useMutation(ADD_NBA_VISIT);

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

  const divisionGroups = {
    "Atlantic": [],
    "Central": [],
    "Southeast": [],
    "Northwest": [],
    "Pacific": [],
    "Southwest": [],
  };

  console.log(divisionGroups);

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
    <section className="nba-stadiums">
      <h1> NBA </h1>
      <h2> {firstName}, which stadiums have you recently visited? </h2>

      <section className="nba-container">
        <section className="nba-row">
          {["Atlantic", "Central", "Southeast"].map((division) => (
            <section className="nba-list" key={division}>
              <h3>{division}</h3>
              {divisionGroups[division].map((stadium) => (
                <section className="nba-item" key={stadium._id}>
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

      <section className="nba-container">
        <section className="nba-row">
          {["Northwest", "Pacific", "Southwest"].map((division) => (
            <section className="nba-list" key={division}>
              <h3>{division}</h3>
              {divisionGroups[division].map((stadium) => (
                <section className="nba-item" key={stadium._id}>
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