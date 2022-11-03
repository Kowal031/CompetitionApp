import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import {
  Button,
  Alert,
  TextField,
  Collapse,
  Autocomplete,
  createFilterOptions,
} from "@mui/material";
import {
  groupListWithAllOption,
  lapsList,
} from "../common/AutocompleteDataContainer";

export function SetNumberOfLapAndGroup({
  modalClose,
  setGroupFilter,
  setLapFilter,
  competitionData,
}) {
  const [openSuccesAlert, setOpenSuccesAlert] = useState(false);

  const validationSchema = yup.object({
    group: yup.string("Choose your group").required("Group is required"),
    lap: yup.string("Choose lap").required("Laps is required"),
  });
  const formik = useFormik({
    initialValues: {
      lap: "",
      group: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setGroupFilter(values.group);
      setLapFilter(values.lap);
      setOpenSuccesAlert(true);
      setTimeout(() => {
        modalClose();
        setOpenSuccesAlert(false);
      }, 2000);
    },
  });
  const filterOptions = createFilterOptions({
    limit: competitionData.laps,
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Autocomplete
          filterOptions={filterOptions}
          disablePortal
          options={lapsList}
          onChange={(event, newValue) => (formik.values.lap = newValue.value)}
          sx={{ mt: 2, width: "100%" }}
          renderInput={(params) => (
            <TextField
              {...params}
              error={formik.touched.lap && Boolean(formik.errors.lap)}
              helperText={formik.touched.lap && formik.errors.lap}
              required
              label="Lap"
            />
          )}
        />
        <Autocomplete
          disablePortal
          options={groupListWithAllOption}
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
            Group and lap selected successfully!
          </Alert>
        </Collapse>
        <Button
          sx={{ width: "100%" }}
          disabled={openSuccesAlert}
          type="submit"
          variant="contained"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
