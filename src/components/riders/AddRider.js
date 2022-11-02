import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Autocomplete,
  Alert,
  Collapse,
} from "@mui/material";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { groupList } from "../common/AutocompleteDataContainer";

export function AddRider({ refreshRidersList, modalClose }) {
  const [openSuccesAlert, setOpenSuccesAlert] = useState(false);

  function refreshRidersListToggle(newValue) {
    refreshRidersList(newValue);
  }

  const validationSchema = yup.object({
    firstName: yup.string("Enter your name").required("Name is required"),
    lastName: yup.string("Enter your surname").required("Surname is required"),
    group: yup.string("Choose your group").required("Group is required"),
  });
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      group: "",
      status: "",
      sumPenalityPoints: 0,
      riderNumber: Math.round(Math.random() * 1000),
      competitionId: useParams().id,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios
        .post(process.env.REACT_APP_RIDERS, values)
        .then(setOpenSuccesAlert(true))
        .then(
          setTimeout(() => {
            refreshRidersListToggle(true);
            modalClose();
            setOpenSuccesAlert(false);
          }, 2000)
        )
        .then(refreshRidersListToggle(false));
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          sx={{ mt: 2 }}
          fullWidth
          label="First Name"
          id="firstName"
          required
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
          sx={{ mt: 2 }}
          id="lastName"
          fullWidth
          required
          label="Last Name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
        <Autocomplete
          disablePortal
          options={groupList}
          onChange={(event, newValue) => (formik.values.group = newValue.value)}
          sx={{ mt: 2, width: "100%" }}
          renderInput={(params) => (
            <TextField
              {...params}
              error={formik.touched.group && Boolean(formik.errors.group)}
              helperText={formik.touched.group && formik.errors.group}
              required
              label="Group"
            />
          )}
        />
        <Collapse sx={{ mt: 2 }} in={openSuccesAlert}>
          <Alert open={openSuccesAlert} severity="success">
            You registration was successful!
          </Alert>
        </Collapse>
        <Button
          sx={{ width: "100%" }}
          disabled={openSuccesAlert}
          variant="contained"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
