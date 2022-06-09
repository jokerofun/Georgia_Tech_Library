import { Box, Paper } from "@mui/material";
import {
  GridColDef,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
  DataGrid,
} from "@mui/x-data-grid";
import { observer } from "mobx-react-lite";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../hooks/useStore";

const columns: GridColDef[] = [
  {
    field: "isbn",
    headerName: "ISBN",
    width: 150,
  },
  {
    field: "libraryName",
    headerName: "Library Name",
    width: 150,
  },
  {
    field: "totalAmount",
    headerName: "Total Amount",
    width: 100,
  },
  {
    field: "availableAmount",
    headerName: "Available Amount",
    width: 100,
  },
  {
    field: "description",
    headerName: "Description",
    width: 800,
  },
];

const CatalogOverview = observer(function CatalogOverview() {
  const catalogStore = useStore("catalogStore");

  const [pageNumber, setPageNumber] = React.useState<number>(0);

  const navigate = useNavigate();

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        sx={{
          width: "100%",
          mb: 2,
          height: 640,
          maxHeight: 640,
        }}
      >
        <DataGrid
          components={{ Toolbar: CustomToolbar }}
          rows={catalogStore.catalog}
          columns={columns}
          getRowId={(i) => i.isbn}
          rowCount={100000}
          pagination
          paginationMode="server"
          pageSize={100}
          rowsPerPageOptions={[]}
          rowThreshold={0}
          checkboxSelection
          page={pageNumber}
          onPageChange={async (newPage) => {
            await catalogStore.fetchBatch(newPage);
            setPageNumber(newPage);
          }}
        />
      </Paper>
    </Box>
  );
});

export default CatalogOverview;
