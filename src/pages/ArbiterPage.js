import { useState, useEffect } from "react";
import axios from "axios";
import { ArbiterRidersList } from "../components/arbiter/ArbiterRidersList";
import { ArbiterPageSubheader } from "../components/arbiter/ArbiterPageSubheader";
import { useParams } from "react-router-dom";
import { allGroups } from "../components/common/CommonVariable";
import { Loading } from "../components/common/Loading";
export function ArbiterPage() {
  const [riders, setRiders] = useState([]);
  const [groupFilter, setGroupFilter] = useState("");
  const [lapFilter, setLapFilter] = useState("");
  const competitionId = useParams().id;
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_RIDERS)
      .then((res) => setRiders(res.data))
      .then(setLoaded(true));
  }, [groupFilter]);

  const filtredRiders = riders.filter((rider) => {
    return rider.competitionId === competitionId;
  });
  return loaded ? (
    <div>
      <div className="bg-color-secondary ">
        <ArbiterPageSubheader
          setLapFilter={setLapFilter}
          setGroupFilter={setGroupFilter}
        />
      </div>
      <div className="justify-center mt-20">
        <div className="w-90 justify-center">
          <div className="w-100 mr-10 ml-10 mb-10">
            {filtredRiders.length === 0 ? (
              <h2 className="justify-center">Riders List is empty</h2>
            ) : groupFilter !== "All" ? (
              <ArbiterRidersList
                groupFilter={groupFilter}
                lapFilter={lapFilter}
                riders={filtredRiders}
              />
            ) : (
              allGroups.map((allGroup) =>
                filtredRiders.some((a) => a.group === allGroup) ? (
                  <ArbiterRidersList
                    key={allGroup}
                    groupFilter={allGroup}
                    lapFilter={lapFilter}
                    riders={filtredRiders}
                  />
                ) : (
                  <div key={allGroup}></div>
                )
              )
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
