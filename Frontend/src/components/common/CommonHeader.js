import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { AppBar, Toolbar, Stack, Button, Typography } from "@mui/material";

export const CommonHeader = () => {
  return (
    <AppBar sx={{ bgcolor: "black" }} position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link className="decoration-none color-white fw-300" to="/">
            LOGO
          </Link>
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button component={Link} to="/" color="inherit">
            Competition List
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
