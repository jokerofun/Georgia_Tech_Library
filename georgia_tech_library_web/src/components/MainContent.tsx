import React from "react";
import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import CatalogOverview from "./CatalogOverview";
import ItemOverview from "./ItemOverview";

const MainContent = () => {
  return (
    <Box sx={{ height: 100, padding: "2% 5%", position: "relative" }}>
      <Routes>
        <Route path="/items" element={<ItemOverview />} />
        <Route path="/catalog" element={<CatalogOverview />} />
        {/* <Route path="/oxygenPlants" element={<OxygenPlantOverview />} />
        <Route
          path="/healthFacilities/create"
          element={<HealthFacilityForm />}
        />
        <Route path="/healthFacilities/edit" element={<HealthFacilityForm />} />
        <Route path="/oxygenPlants/edit" element={<OxygenPlantForm />} />
        <Route path="/oxygenPlants/create" element={<OxygenPlantForm />} />
        <Route path="/locations/create" element={<LocationForm />} /> */}
      </Routes>
    </Box>
  );
};

export default MainContent;
