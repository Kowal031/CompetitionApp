import { useState } from "react";
import { Button } from "@mui/material";
import { CreateCompetition } from "./CreateCompetition";
import { CommonModal } from "../common/CommonModal";

export function CompetitionListSubheader({ refreshCompetitionList }) {
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <div className="flex-end align-center">
      <Button
        sx={{ m: 1 }}
        variant="contained"
        onClick={handleOpen}
        size="large"
      >
        Create Competition
      </Button>

      <CommonModal openModal={openModal} handleClose={handleClose}>
        <h1 className="justify-center">Create Competition</h1>
        <CreateCompetition
          modalClose={handleClose}
          refreshCompetitionList={refreshCompetitionList}
        />
      </CommonModal>
    </div>
  );
}
