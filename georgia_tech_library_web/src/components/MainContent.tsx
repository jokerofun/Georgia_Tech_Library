import React from "react";
import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import CatalogOverview from "./CatalogOverview";
import ItemOverview from "./ItemOverview";
import CardOverview from "./CardOverview";
import CardForm from "./CardForm";
import BorrowingActivityOverview from "./BorrowingActivityOverview";

const MainContent = () => {
  return (
    <Box sx={{ height: 100, padding: "2% 5%", position: "relative" }}>
      <Routes>
        <Route path="/items" element={<ItemOverview />} />
        <Route path="/catalog" element={<CatalogOverview />} />
        <Route
          path="/borrowingactivity"
          element={<BorrowingActivityOverview />}
        />
        <Route path="/cards" element={<CardOverview />} />
        <Route path="/cards/create" element={<CardForm />} />
      </Routes>
    </Box>
  );
};

export default MainContent;
