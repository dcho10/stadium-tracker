import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { QUERY_USER, QUERY_NFL } from "../utils/queries";
import { ADD_NFL_VISIT } from "../utils/mutations";
import AuthService from "../utils/auth";

import "./NFL.css"
import NFLLogo from "../assets/nfl-logo.svg"

export default function NFL() {
  const user = AuthService.getUser();
  const userId = user.data._id;
  const firstName = user.data.firstName
  
  const { loading: loadingUser, error: errorUser, data: userData } = useQuery(QUERY_USER, {
    variables: { userId },
  })

  const { loading: loadingNFL, error: errorNFL, data: nflData } = useQuery(QUERY_NFL)
  console.log(nflData);
  const stadiums = nflData?.nflStadiums || [];

  const [visitedStadiums, setVisitedStadiums] = useState({});
  const [selectedStadium, setSelectedStadium] = useState(null);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [dateVisited, setDateVisited] = useState(null);

  const [addNFLVisit] = useMutation(ADD_NFL_VISIT);

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

stadiums.forEach((stadium) => {
  const { conference, division } = stadium;
  const groupKey = `${conference} ${division}`;  

  if (conferenceGroups[groupKey]) {
    conferenceGroups[groupKey].push(stadium);
  }
});

Object.keys(conferenceGroups).forEach((group) => {
  conferenceGroups[group].sort((a, b) => a.stadiumName.localeCompare(b.stadiumName));
});

return (
  <section className="nfl-stadiums">
    <div className="logo-container">
      <img src={NFLLogo} alt="NFL Logo" />
    </div>
    <h1> {firstName}, which stadiums have you recently visited? </h1>

    <section className="nfl-container">
      <section className="nfl-row">
        {["AFC East", "AFC North", "AFC South", "AFC West"].map((division) => (
          <section className="nfl-list" key={division}>
            <h2>{division}</h2>
            {conferenceGroups[division].map((stadium) => (
              <section className="nfl-item" key={stadium._id}>
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

    <section className="nfl-container">
      <section className="nfl-row">
        {["NFC East", "NFC North", "NFC South", "NFC West"].map((division) => (
          <section className="nfl-list" key={division}>
            <h2>{division}</h2>
            {conferenceGroups[division].map((stadium) => (
              <section className="nfl-item" key={stadium._id}>
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
);
}