import * as React from "react";
import { useState } from "react";
import MuiToggleButton from "@mui/material/ToggleButton";
import { ToggleButtonGroup, styled } from "@mui/material";

export function GroupFilter({ setFilterGroup }) {
  const [value, setValue] = useState(null);
  const handleFormat = (event, filterGroup) => {
    setFilterGroup(filterGroup);
    setValue(filterGroup);
  };
  const ToggleButton = styled(MuiToggleButton)({
    "&.Mui-selected, &.Mui-selected:hover": {
      color: "white",
      backgroundColor: "#0072E5",
    },
  });

  return (
    <div className="space-between align-center">
      <div className="h-100">
        <ToggleButtonGroup
          value={value}
          size="small"
          onChange={handleFormat}
          exclusive
          aria-label="text alignment"
        >
          <ToggleButton value="A">Group A</ToggleButton>
          <ToggleButton value="B">Group B</ToggleButton>
          <ToggleButton value="C">Group C</ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
}
