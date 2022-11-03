import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { SetNumberOfLapAndGroup } from "./SetNumberOfLapAndGroup";
import { ButtonWithDisabledStyle } from "../common/ButtonWithDisabledStyle";
import { CommonModal } from "../common/CommonModal";

export function ArbiterPageSubheader({ setGroupFilter, setLapFilter }) {
  const [toggleForFetchLaps, setToggleForFetchLaps] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const competitionId = useParams().id;
  const [competitionData, setCompetitionData] = useState();
  const [toggleForFetchPoints, setToggleForFetchPoints] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_COMPETITIONS}${competitionId}`)
      .then((res) => setCompetitionData(res.data));
    setToggleForFetchPoints(false);
  }, [toggleForFetchPoints, competitionId]);

  const handleClose = () => {
    setOpenModal(false);
  };

  const changeCompetitionStatus = (newStatus) => {
    axios.put(`${process.env.REACT_APP_COMPETITIONS}${competitionId}`, {
      status: newStatus,
    });
    setToggleForFetchPoints(true);
  };

  return (
    <div className="justify-center">
      {competitionData?.status === "Finished" ? (
        <h2 className="color-white justify-center">
          Competition is over, you can't edit the results
        </h2>
      ) : (
        <div className="justify-center flex-column">
          <h1 className="justify-center m-0  color-white">
            {competitionData?.title}
          </h1>
          <div className="mt-5 space-around breakpoints-row-to-column">
            <ButtonWithDisabledStyle
              sx={{ m: 1 }}
              size="large"
              onClick={() => {
                changeCompetitionStatus("Started");
              }}
              disabled={competitionData?.status === "Started"}
              variant="contained"
            >
              Start
            </ButtonWithDisabledStyle>
            <ButtonWithDisabledStyle
              sx={{ m: 1 }}
              size="large"
              disabled={competitionData?.status === "Not Started"}
              onClick={() => {
                changeCompetitionStatus("Finished");
                setGroupFilter("");
              }}
              variant="contained"
            >
              Stop
            </ButtonWithDisabledStyle>

            <ButtonWithDisabledStyle
              sx={{ m: 1 }}
              size="large"
              disabled={competitionData?.status !== "Started"}
              variant="contained"
              onClick={() => {
                setOpenModal(true);
                setToggleForFetchLaps(!toggleForFetchLaps);
              }}
            >
              Select lap and group
            </ButtonWithDisabledStyle>
          </div>
        </div>
      )}
      <CommonModal openModal={openModal} handleClose={handleClose}>
        <h1 className="justify-center">Select lap and group</h1>
        <SetNumberOfLapAndGroup
          modalClose={handleClose}
          setGroupFilter={setGroupFilter}
          setLapFilter={setLapFilter}
          competitionData={competitionData}
        />
      </CommonModal>
    </div>
  );
}
