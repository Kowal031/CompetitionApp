import { CompetitionListSubheader } from "../components/competition/CompetitionListSubheader";
import { CompetitionList } from "../components/competition/CompetitionList";
import { CompetitionFilter } from "../components/common/CompetitionFilter";
import { Loading } from "../components/common/Loading";
import { useState, useEffect } from "react";
import axios from "axios";
export function CompetitionListPage() {
  const [competitions, setCompetitions] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const [filterCompetition, setFilterCompetition] = useState(null);
  const [loaded, setLoaded] = useState(false);
  function refreshCompetitionList(newValue) {
    setRefreshData(newValue);
  }

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_COMPETITIONS)
      .then((res) => setCompetitions(res.data))
      .then(setLoaded(true));
    setRefreshData(false);
  }, [refreshData]);

  return loaded ? (
    <div className="justify-center flex-column">
      <div className="bg-color-secondary">
        <div>
          <CompetitionListSubheader
            refreshCompetitionList={refreshCompetitionList}
          />
        </div>
      </div>
      <div className="justify-center">
        <div className="w-90 m-10">
          <CompetitionFilter setFilterCompetition={setFilterCompetition} />
          {filterCompetition === null ? (
            <CompetitionList
              competitions={competitions}
              competitionsLenght={competitions.length}
            />
          ) : (
            <CompetitionList
              competitions={competitions.filter(
                (a) => a.status === filterCompetition
              )}
              competitionsLenght={competitions.length}
            />
          )}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
