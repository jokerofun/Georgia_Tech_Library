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
    field: "id",
    headerName: "ID",
    width: 150,
  },
  {
    field: "ssn",
    headerName: "SSN",
    width: 150,
  },
  {
    field: "isbn",
    headerName: "ISBN",
    width: 100,
  },
  {
    field: "libraryName",
    headerName: "Library Name",
    width: 150,
  },
  {
    field: "borrowingDate",
    headerName: "Borrowing Date",
    type: "date",
    width: 200,
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    width: 200,
  },
  {
    field: "dateOfReturn",
    headerName: "Date of Return",
    width: 200,
  },
];

const BorrowingActivityOverview = observer(
  function BorrowingActivityOverview() {
    const borrowingActivityStore = useStore("borrowingActivityStore");

    const [pageNumber, setPageNumber] = React.useState<number>(0);

    const navigate = useNavigate();

    // const [pageSize, setPageSize] = React.useState<number>(25);

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
            density="compact"
            components={{ Toolbar: CustomToolbar }}
            rows={borrowingActivityStore.bas}
            columns={columns}
            getRowId={(i) => i.id}
            rowCount={1000000}
            pagination
            paginationMode="server"
            pageSize={100}
            rowsPerPageOptions={[]}
            rowThreshold={0}
            checkboxSelection
            page={pageNumber}
            onPageChange={async (newPage) => {
              await borrowingActivityStore.fetchBatch(newPage);
              setPageNumber(newPage);
            }}
            // disableSelectionOnClick
          />
        </Paper>
      </Box>
    );
  },
);

export default BorrowingActivityOverview;
