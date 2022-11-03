import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export function RidersList({ riders, groupFilter }) {
  function checkRiders() {
    return riders.filter((rider) => rider.group === groupFilter);
  }
  return (
    <div>
      <TableContainer sx={{ maxHeight: 750 }} component={Paper}>
        <Table aria-label="simple table">
          <TableHead className="">
            <TableRow>
              <TableCell className="">Number</TableCell>
              <TableCell className="">Name</TableCell>
            </TableRow>
          </TableHead>
          {checkRiders().length > 0 ? (
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
                        <TableCell className="">{rider.riderNumber}</TableCell>
                        <TableCell className="">
                          {rider.firstName} {rider.lastName}
                        </TableCell>
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
  );
}
