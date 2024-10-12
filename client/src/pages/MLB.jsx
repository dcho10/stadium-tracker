import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { QUERY_USER, QUERY_MLB } from "../utils/queries";
import { ADD_MLB_VISIT } from "../utils/mutations";
import AuthService from "../utils/auth";

import "./MLB.css"

export default function MLB() {
  const user = AuthService.getUser();
  const userId = user.data._id;
  const firstName = user.data.firstName
  
  const { loading: loadingUser, error: errorUser, data: userData } = useQuery(QUERY_USER, {
    variables: { userId },
  })

  const { loading: loadingMLB, error: errorMLB, data: mlbData } = useQuery(QUERY_MLB)
  const stadiums = mlbData?.mlbStadiums || [];

  const [visitedStadiums, setVisitedStadiums] = useState({});
  const [selectedStadium, setSelectedStadium] = useState(null);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [dateVisited, setDateVisited] = useState(null);
  const [visitedCount, setVisitedCount] = useState(0);

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
    <section className="league-stadiums">
      <h1> MLB </h1>
      <h2> {firstName}, which stadiums have you recently visited? </h2>

      <section className="stadium-container">
        <section className="stadium-row">
          {["AL East", "AL Central", "AL West"].map((division) => (
            <section className="stadiums-list" key={division}>
              <h3>{division}</h3>
              {divisionGroups[division].map((stadium) => (
                <section className="stadium-item" key={stadium._id}>
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

      <section className="stadium-container">
        <section className="stadium-row">
          {["NL East", "NL Central", "NL West"].map((division) => (
            <section className="stadiums-list" key={division}>
              <h3>{division}</h3>
              {divisionGroups[division].map((stadium) => (
                <section className="stadium-item" key={stadium._id}>
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