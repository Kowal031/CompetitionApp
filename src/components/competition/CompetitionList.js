import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

export function CompetitionList({ competitions, competitionsLenght }) {
  let competitionNumber = 0;
  return (
    <TableContainer sx={{ maxHeight: 750 }} elevation={3} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Number of Laps</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Results</TableCell>
          </TableRow>
        </TableHead>
        {competitionsLenght ? (
          <TableBody>
            {competitions
              .sort(
                (a, b) =>
                  b.status.localeCompare(a.status) ||
                  a.title.localeCompare(b.title)
              )
              .map((competition) => (
                <TableRow
                  className="primary-bacground-with-hover"
                  key={competition.id}
                >
                  <TableCell>{(competitionNumber += 1)}</TableCell>
                  <TableCell
                    className="link decoration-none "
                    component={Link}
                    to={`/competition-details/${competition.id}`}
                    state={{ title: competition.title }}
                  >
                    {competition.title}
                  </TableCell>
                  <TableCell>{competition.laps}</TableCell>
                  <TableCell>{competition.status}</TableCell>
                  <TableCell className="decoration-none" component={Link}>
                    <Button
                      component={Link}
                      to={`/competition-results/${competition.id}`}
                      variant="contained"
                    >
                      Results
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        ) : (
          <TableBody>
            <TableCell sx={{ p: 0 }} align="center" colSpan="100%">
              <h3>Competition List is empty</h3>
            </TableCell>
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
