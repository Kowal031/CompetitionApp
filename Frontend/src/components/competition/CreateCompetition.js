import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { Button, Alert, TextField, Collapse } from "@mui/material";
import axios from "axios";

export function CreateCompetition({ refreshCompetitionList, modalClose }) {
  const [openSuccesAlert, setOpenSuccesAlert] = useState(false);

  function refreshCompetitionListToggle(newValue) {
    refreshCompetitionList(newValue);
  }
  const validationSchema = yup.object({
    title: yup.string("Enter your title").required("Title is required"),
    laps: yup
      .number("Choose lap number")
      .min(5, "Laps should be of minimum 5")
      .max(10, "Laps should be of maximum 10")
      .required("Laps is required"),
  });
  const formik = useFormik({
    initialValues: {
      title: "",
      laps: null,
      status: "Not Started",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios
        .post(process.env.REACT_APP_COMPETITIONS, values)
        .then(setOpenSuccesAlert(true))
        .then(
          setTimeout(() => {
            refreshCompetitionListToggle(true);
            modalClose();
            setOpenSuccesAlert(false);
          }, 2000)
        )
        .then(refreshCompetitionListToggle(false));
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          sx={{ mt: 2 }}
          fullWidth
          required
          id="title"
          label="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />

        <TextField
          sx={{ mt: 2 }}
          fullWidth
          type="number"
          id="laps"
          label="Laps"
          required
          value={formik.values.laps}
          onChange={formik.handleChange}
          error={formik.touched.laps && Boolean(formik.errors.laps)}
          helperText={formik.touched.laps && formik.errors.laps}
        />

        <Collapse sx={{ mt: 2 }} in={openSuccesAlert}>
          <Alert open={openSuccesAlert} severity="success">
            You create competition successly!
          </Alert>
        </Collapse>
        <Button
          disabled={openSuccesAlert}
          sx={{ width: "100%" }}
          type="submit"
          variant="contained"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
