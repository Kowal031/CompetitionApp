import { Box, CircularProgress } from "@mui/material";
export function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "90vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
