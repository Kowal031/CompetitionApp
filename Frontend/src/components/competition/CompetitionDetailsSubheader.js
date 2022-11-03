import { AddRider } from "../riders/AddRider";
import { Button } from "@mui/material";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CommonModal } from "../common/CommonModal";
import { ButtonWithDisabledStyle } from "../common/ButtonWithDisabledStyle";
import axios from "axios";

export function CompetitionDetailsSubheader({ refreshRidersList }) {
  const [competitionData, setCompetitionData] = useState();
  const competitionId = useParams().id;
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  axios
    .get(`${process.env.REACT_APP_COMPETITIONS}${competitionId}`)
    .then((res) => setCompetitionData(res.data));

  return (
    <div className="justify-center">
      <div className="">
        <h1 className="justify-center m-0  color-white">
          {competitionData?.title}
        </h1>
        <div className=" space-around  breakpoints-row-to-column">
          <ButtonWithDisabledStyle
            sx={{ m: 1 }}
            size="large"
            variant="contained"
            onClick={handleOpen}
            disabled={competitionData?.status !== "Not Started"}
          >
            Register to Competition
          </ButtonWithDisabledStyle>

          <CommonModal openModal={openModal} handleClose={handleClose}>
            <h1 className="justify-center" id="parent-modal-title">
              Register to Competition
            </h1>
            <AddRider
              modalClose={handleClose}
              refreshRidersList={refreshRidersList}
            />
          </CommonModal>

          <Button
            component={Link}
            to={`/arbiter/${competitionId}`}
            sx={{ m: 1 }}
            size="large"
            variant="contained"
          >
            Judge Competition
          </Button>

          <Button
            component={Link}
            to={`/competition-results/${competitionId}`}
            sx={{ m: 1 }}
            size="large"
            variant="contained"
          >
            Results
          </Button>
        </div>
      </div>
    </div>
  );
}
