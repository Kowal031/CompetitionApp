import { CompetitionDetailsSubheader } from "../components/competition/CompetitionDetailsSubheader";
import { RidersList } from "../components/riders/RidersList";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { GroupFilter } from "../components/common/GroupFilter";
import { allGroups } from "../components/common/CommonVariable";
import { Loading } from "../components/common/Loading";

export function CompetitionDetailsPage() {
  const [riders, setRiders] = useState([]);
  const competitionId = useParams().id;
  const [filterGroup, setFilterGroup] = useState(null);
  const [refreshData, setRefreshData] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_RIDERS)
      .then((res) => setRiders(res.data))
      .then(setLoaded(true));
  }, [refreshData]);

  function refreshRidersList(newValue) {
    setRefreshData(newValue);
  }
  const filtredRiders = riders.filter((rider) => {
    return rider.competitionId === competitionId;
  });

  return loaded ? (
    <div>
      <div className="bg-color-secondary">
        <div>
          <CompetitionDetailsSubheader refreshRidersList={refreshRidersList} />
        </div>
      </div>
      <div className="justify-center mt-20">
        <div className="w-90 justify-center">
          <div className="w-100 mr-10 ml-10 mb-10">
            <GroupFilter setFilterGroup={setFilterGroup} />
            {filtredRiders.length === 0 ? (
              <h2 className="justify-center">Riders List is empty</h2>
            ) : filterGroup === null ? (
              <div>
                {allGroups.map((allGroup) =>
                  filtredRiders.some((a) => a.group === allGroup) ? (
                    <div key={allGroup}>
                      <p>Group {allGroup}</p>
                      <RidersList
                        groupFilter={allGroup}
                        riders={filtredRiders}
                      />
                    </div>
                  ) : (
                    <div key={allGroup}></div>
                  )
                )}
              </div>
            ) : (
              <div>
                <p>Group {filterGroup}</p>
                <RidersList groupFilter={filterGroup} riders={filtredRiders} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
