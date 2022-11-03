import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";

export function ArbiterRidersList({ riders, groupFilter, lapFilter }) {
  const [openSuccesAlert, setOpenSuccesAlert] = useState(false);
  const [pointsValue, setPointsValue] = useState();
  const [lapsPoints, setPointsList] = useState([]);
  const [toggleForFetchPoints, setToggleForFetchPoints] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_PENALTY_POINTS)
      .then((res) => setPointsList(res.data));
    setToggleForFetchPoints(false);
  }, [toggleForFetchPoints]);

  function handleChange(e) {
    if (e.target.value < 0 || e.target.value > 5) {
      return (e.target.value = null);
    }
    setPointsValue({
      ...pointsValue,
      [e.target.name]: parseInt(e.target.value),
    });
  }

  function handleClose() {
    setOpenSuccesAlert(false);
  }

  function handleClick(riderId) {
    setDisabled(true);
    const riderPointsExist = lapsPoints.some(
      (lapList) => lapList.riderId === riderId && lapList.number === lapFilter
    );
    if (!riderPointsExist) {
      axios
        .post(process.env.REACT_APP_PENALTY_POINTS, {
          riderId: riderId,
          number: lapFilter,
          penalityPoints: pointsValue[riderId],
        })
        .then(
          axios
            .get(process.env.REACT_APP_PENALTY_POINTS)
            .then((res) => setPointsList(res.data))
        );
    } else {
      const lapsId = lapsPoints.filter(
        (e) => e.riderId === riderId && e.number === lapFilter
      );
      axios
        .put(`${process.env.REACT_APP_PENALTY_POINTS}${lapsId[0].id}`, {
          penalityPoints: pointsValue[riderId],
        })
        .then(
          axios
            .get(process.env.REACT_APP_PENALTY_POINTS)
            .then((res) => setPointsList(res.data))
        );
    }
    setOpenSuccesAlert(true);
    setTimeout(() => {
      setDisabled(false);
    }, 1000);
  }

  return (
    <div>
      {groupFilter ? (
        <>
          <p>
            Group {groupFilter}, Lap {lapFilter}
          </p>

          <TableContainer
            sx={{ maxHeight: 750 }}
            elevation={3}
            component={Paper}
          >
            <Table
              className=""
              sx={{ minWidth: 400 }}
              aria-label="simple table"
            >
              <TableHead className="">
                <TableRow>
                  <TableCell className="">Number</TableCell>
                  <TableCell className="">First Name</TableCell>
                  <TableCell className="">Surname</TableCell>
                  <TableCell className="">Points</TableCell>
                  <TableCell> Save Points</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {riders
                  .sort(
                    (a, b) =>
                      a.riderNumber - b.riderNumber ||
                      a.firstName.localeCompare(b.firstName) ||
                      a.lastName.localeCompare(b.lastName)
                  )
                  .map(
                    (rider) =>
                      rider.group === groupFilter && (
                        <TableRow key={rider.id}>
                          <TableCell className="">
                            {rider.riderNumber}
                          </TableCell>
                          <TableCell className="">{rider.firstName}</TableCell>
                          <TableCell className="">{rider.lastName}</TableCell>
                          <TableCell>
                            <TextField
                              type="number"
                              key={rider.id}
                              id={rider.id}
                              name={rider.id}
                              onChange={handleChange}
                              size="small"
                              helperText={"Points range 0-5"}
                            ></TextField>
                          </TableCell>
                          <TableCell>
                            <Button
                              onClick={() => {
                                handleClick(rider.id);
                                setToggleForFetchPoints(!toggleForFetchPoints);
                              }}
                              disabled={disabled}
                              variant="contained"
                            >
                              Save
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                  )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <div className="justify-center fs-28 "></div>
      )}
      <Snackbar
        autoHideDuration={1000}
        open={openSuccesAlert}
        onClose={handleClose}
      >
        <Alert
          variant="filled"
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          You added point successly!
        </Alert>
      </Snackbar>
    </div>
  );
}
