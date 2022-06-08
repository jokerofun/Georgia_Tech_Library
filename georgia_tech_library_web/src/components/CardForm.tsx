import { Divider, Paper, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { useStore } from "../hooks/useStore";
import { observer } from "mobx-react-lite";
import { useAPI } from "../hooks/useAPI";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiCardInsertPostRequest, CardApi } from "../api";
import { cardSchema, FormCard } from "./yupSchemas";
import CardFormFields from "./CardFormFields";

const CardForm = observer(function CardForm() {
  const cardApi = useAPI(CardApi);
  const cardStore = useStore("cardStore");
  const location = useLocation();

  const navigate = useNavigate();

  async function handleFormikSubmit(card: FormCard) {
    await createCardPostRequest(card);
    navigate(-1);
  }

  async function createCardPostRequest(card: FormCard) {
    const requestParameters: ApiCardInsertPostRequest = {
      card: {
        cardNumber: card.cardNumber,
        dateOfIssue: card.dateOfIssue,
        expirationDay: card.expirationDay,
      },
    };
    await cardApi.apiCardInsertPost(requestParameters);
    cardStore.setSingleCard(card);
  }

  return (
    <Paper
      sx={{
        width: "65%",
        margin: "0 auto",
        padding: "5%",
        paddingTop: "2%",
      }}
    >
      <Typography variant="h3" align="center">
        Create Card
      </Typography>
      <Divider sx={{ margin: "3% 0" }}></Divider>

      <Formik
        initialValues={{
          cardNumber: "",
          dateOfIssue: new Date(),
          expirationDay: new Date(),
        }}
        validationSchema={cardSchema}
        onSubmit={handleFormikSubmit}
      >
        {(props: any) => (
          <Form>
            <CardFormFields props={props as any} />
          </Form>
        )}
      </Formik>
    </Paper>
  );
});

export default CardForm;
