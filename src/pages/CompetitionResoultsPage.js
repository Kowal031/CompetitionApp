import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ResultsList } from "../components/results/ResultsList";
import { allGroups } from "../components/common/CommonVariable";
import { GroupFilter } from "../components/common/GroupFilter";
import { Loading } from "../components/common/Loading";
export function CompetitionResoultsPage() {
  const [riders, setRiders] = useState([]);
  const [points, setPoints] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const competitionId = useParams().id;
  const [filterGroup, setFilterGroup] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const filtredRiders = riders.filter((rider) => {
    return rider.competitionId === competitionId;
  });
  useEffect(() => {
    setInterval(() => {
      axios
        .get(`${process.env.REACT_APP_COMPETITIONS}${competitionId}`)
        .then((res) => {
          setCompetitions(res.data);
          return axios.get(process.env.REACT_APP_PENALTY_POINTS);
        })
        .then((res) => {
          setPoints(res.data);
          return axios.get(process.env.REACT_APP_RIDERS);
        })
        .then((res) => setRiders(res.data))
        .then(setLoaded(true));
    }, 1000);
  }, [competitionId]);
  return loaded ? (
    <div className="justify-center flex-column">
      <div className="bg-color-secondary">
        <h1 className="justify-center m-10  color-white">
          {competitions.title}
        </h1>
      </div>
      <div className="justify-center mt-20">
        <div className="w-90 mb-10 mt-10">
          <GroupFilter setFilterGroup={setFilterGroup} />
          {filtredRiders.length === 0 ? (
            <h2 className="justify-center">Riders List is empty</h2>
          ) : filterGroup === null ? (
            <div>
              {allGroups.map((allGroup) =>
                filtredRiders.some((a) => a.group === allGroup) ? (
                  <div key={allGroup}>
                    <ResultsList
                      groupFilter={allGroup}
                      riders={filtredRiders}
                      points={points}
                      numberOfLaps={competitions.laps}
                      competitions={competitions}
                    />
                  </div>
                ) : (
                  ""
                )
              )}
            </div>
          ) : (
            <div>
              <ResultsList
                groupFilter={filterGroup}
                riders={filtredRiders}
                points={points}
                numberOfLaps={competitions.laps}
                competitions={competitions}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
