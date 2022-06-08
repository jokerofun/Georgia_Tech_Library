import { Grid, Typography, TextField, Button, Divider } from "@mui/material";
import { Field, FormikProps, useField, useFormikContext } from "formik";
import { useNavigate } from "react-router-dom";
import { FormCard } from "./yupSchemas";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const DatePickerField = ({ ...props }: any) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <DatePicker
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val: any) => {
        setFieldValue(field.name, val);
      }}
    />
  );
};

const CardFormFields = ({ props }: { props: FormikProps<FormCard> }) => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={3} justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h6">Card Details</Typography>
      </Grid>

      <Grid item xs={6}>
        <legend>Card Number</legend>
        <Field
          as={TextField}
          id="cardNumber"
          name="cardNumber"
          label="Enter card number"
          fullWidth
          value={props.values.cardNumber}
          onChange={props.handleChange}
          error={props.touched.cardNumber && Boolean(props.errors.cardNumber)}
          helperText={props.touched.cardNumber && props.errors.cardNumber}
        />
      </Grid>

      <Grid item xs={6}>
        <legend>Date of Issue</legend>
        <Field
          as={DatePickerField}
          id="dateOfIssue"
          name="dateOfIssue"
          // label="Date of Issue"
          placeholderText="Select date"
          fullWidth
          value={props.values.dateOfIssue}
          onChange={props.handleChange}
          error={props.touched.dateOfIssue && Boolean(props.errors.dateOfIssue)}
          helperText={props.touched.dateOfIssue && props.errors.dateOfIssue}
        />
      </Grid>

      <Grid item xs={6}>
        <legend>Expiration Day</legend>
        <Field
          as={DatePickerField}
          id="expirationDay"
          name="expirationDay"
          // label="Expiration Day"
          placeholderText="Select date"
          fullWidth
          value={props.values.expirationDay}
          onChange={props.handleChange}
          error={
            props.touched.expirationDay && Boolean(props.errors.expirationDay)
          }
          helperText={props.touched.expirationDay && props.errors.expirationDay}
        />
      </Grid>

      {/* <Grid item xs={6}>
        <Field
          type="datetime-local"
          as={TextField}
          id="dateOfIssue"
          name="dateOfIssue"
          //   label="Date of Issue"
          fullWidth
          value={props.values.dateOfIssue}
          onChange={props.handleChange}
          error={props.touched.dateOfIssue && Boolean(props.errors.dateOfIssue)}
          helperText={props.touched.dateOfIssue && props.errors.dateOfIssue}
        />
      </Grid>
      <Grid item xs={6}>
        <Field
          type="datetime-local"
          as={TextField}
          id="expirationDay"
          name="expirationDay"
          //   label="Expiration Day"
          fullWidth
          value={props.values.expirationDay}
          onChange={props.handleChange}
          error={
            props.touched.expirationDay && Boolean(props.errors.expirationDay)
          }
          helperText={props.touched.expirationDay && props.errors.expirationDay}
        />
      </Grid> */}

      <Grid item>
        <Divider sx={{ margin: "3% 0" }}></Divider>
      </Grid>
      <Grid container item xs={12} spacing={3}>
        <Grid item textAlign="end" xs={6}>
          <Button color="primary" variant="contained" type="submit" id="Submit">
            Submit
          </Button>
        </Grid>
        <Grid item textAlign="start" xs={6}>
          <Button onClick={() => navigate(-1)}>Cancel</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CardFormFields;
