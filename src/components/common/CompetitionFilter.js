import * as React from "react";
import { useState } from "react";
import MuiToggleButton from "@mui/material/ToggleButton";
import { ToggleButtonGroup, styled } from "@mui/material";

export function CompetitionFilter({ setFilterCompetition }) {
  const [value, setValue] = useState(null);
  const handleFormat = (event, filterCompetition) => {
    setFilterCompetition(filterCompetition);
    setValue(filterCompetition);
  };
  const ToggleButton = styled(MuiToggleButton)({
    "&.Mui-selected, &.Mui-selected:hover": {
      color: "white",
      backgroundColor: "#0072E5",
    },
  });

  return (
    <div className="space-between align-center mb-10">
      <div className="h-100">
        <ToggleButtonGroup
          value={value}
          size="small"
          onChange={handleFormat}
          exclusive
          aria-label="text alignment"
        >
          <ToggleButton value="Not Started">Not Started</ToggleButton>
          <ToggleButton value="Started">Started</ToggleButton>
          <ToggleButton value="Finished">Finished</ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
}
