import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { lapsList } from "../common/AutocompleteDataContainer";

export function ResultsList({
  riders,
  groupFilter,
  points,
  numberOfLaps,
  competitions,
  loaded,
}) {
  let competitionNumber = 0;

  function sumPenaltyPoints(riderId) {
    let sum = 0;
    points
      .filter((e) => e.riderId === riderId)
      .map((e) => (sum += e.penalityPoints));
    axios.put(`${process.env.REACT_APP_RIDERS}${riderId}`, {
      sumPenalityPoints: sum,
    });
    return sum;
  }
  function checkRiders() {
    return riders.filter((rider) => rider.group === groupFilter);
  }

  function updateStatus(riderId) {
    if (
      Object.keys(
        points.filter((e) => e.riderId === riderId).map((e) => e.penalityPoints)
      ).length !== numberOfLaps
    ) {
      axios.patch(`${process.env.REACT_APP_RIDERS}${riderId}`, {
        status: "Disqualified",
      });
    } else {
      axios.patch(`${process.env.REACT_APP_RIDERS}${riderId}`, {
        status: "Finished",
      });
    }
  }

  return (
    <div>
      <div>
        <p>Group {groupFilter}</p>

        <TableContainer sx={{ maxHeight: 750 }} elevation={3} component={Paper}>
          <Table aria-label="simple table">
            <TableHead className="">
              <TableRow>
                <TableCell className="">Position</TableCell>
                <TableCell className="">Name</TableCell>
                <TableCell className="">Number</TableCell>
                {lapsList.slice(0, numberOfLaps).map((lap) => (
                  <TableCell key={lap.value}>Lap {lap.value}</TableCell>
                ))}
                <TableCell> Sum of Penalty Points</TableCell>
                <TableCell className="">Status</TableCell>
              </TableRow>
            </TableHead>
            {checkRiders().length > 0 ? (
              <TableBody>
                {riders
                  .sort((a, b) => {
                    return (
                      b.status.localeCompare(a.status) ||
                      a.sumPenalityPoints - b.sumPenalityPoints
                    );
                  })
                  .map(
                    (rider) =>
                      rider.group === groupFilter && (
                        <TableRow
                          className={
                            competitions.status === "Finished"
                              ? rider.status === "Disqualified"
                                ? "disqualfication"
                                : ""
                              : ""
                          }
                          key={rider.id}
                        >
                          <TableCell>{(competitionNumber += 1)}</TableCell>
                          <TableCell>
                            {`${rider.firstName} ${rider.lastName}`}
                          </TableCell>
                          <TableCell>{rider.riderNumber}</TableCell>

                          {lapsList
                            .slice(0, numberOfLaps)
                            .map((lap) =>
                              points
                                .map((e) => e.number)
                                .includes(lap.value) ? (
                                <TableCell key={lap.value}>
                                  {points.map(
                                    (e) =>
                                      e.number === lap.value &&
                                      e.riderId === rider.id && (
                                        <div key={e.id}>{e.penalityPoints}</div>
                                      )
                                  )}
                                </TableCell>
                              ) : (
                                <TableCell key={lap.value}></TableCell>
                              )
                            )}
                          {competitions.status !== "Finished"
                            ? updateStatus(rider.id)
                            : ""}

                          <TableCell>{sumPenaltyPoints(rider.id)}</TableCell>

                          {competitions.status === "Finished" ? (
                            <TableCell
                              sx={{
                                color:
                                  rider.status === "Disqualified" ? "red" : "",
                              }}
                            >
                              {rider.status}
                            </TableCell>
                          ) : (
                            <TableCell></TableCell>
                          )}
                        </TableRow>
                      )
                  )}
              </TableBody>
            ) : (
              <TableBody>
                <TableCell sx={{ p: 0 }} align="center" colSpan="100%">
                  <h3>Group {groupFilter} is empty</h3>
                </TableCell>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
