import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import { useStore } from "../hooks/useStore";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import {
  GridColDef,
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridRowId,
} from "@mui/x-data-grid";
import { Card, CardApi } from "../api";
import { useAPI } from "../hooks/useAPI";

const columns: GridColDef[] = [
  {
    field: "cardNumber",
    headerName: "Card Number",
    width: 150,
  },
  {
    field: "dateOfIssue",
    headerName: "Date of Issue",
    type: "date",
    width: 200,
  },
  {
    field: "expirationDay",
    headerName: "Expiration Day",
    type: "date",
    width: 200,
  },
];

const CardOverview = observer(function CardOverview() {
  const cardStore = useStore("cardStore");
  const cardApi = useAPI(CardApi);

  const navigate = useNavigate();

  const [pageSize, setPageSize] = React.useState<number>(25);
  const [selected, setSelection] = React.useState<Card[]>([]);
  // const [selectionModel, setSelectionModel] = React.useState<GridRowId[]>([]);

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        <Tooltip title="Create">
          <IconButton
            onClick={(event) => {
              event.stopPropagation();
              navigate(`/cards/create`);
            }}
            title="AddCard"
          > 
            <AddIcon/>
          </IconButton>
        </Tooltip>

        {selected.length > 0 && (
          <Tooltip title="Delete" arrow>
            <IconButton
              onClick={async () => {
                await cardApi.apiCardDeleteCardNumberDelete(selected[0]);
                // await new Promise((resolve) => setTimeout(resolve, 1000));
                await cardStore.fetch();
              }}
              title="DeleteCard"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </GridToolbarContainer>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        sx={{
          width: 600,
          mb: 2,
          height: 640,
          maxHeight: 640,
          marginLeft: "25%",
        }}
      >
        <DataGrid
          components={{ Toolbar: CustomToolbar }}
          rows={cardStore.cards}
          columns={columns}
          getRowId={(c) => c.cardNumber}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[10, 25, 50]}
          rowThreshold={0}
          checkboxSelection
          // selectionModel={selectionModel}
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRowData = cardStore.cards.filter((row: Card) => {
              return selectedIDs.has(row.cardNumber.toString() as GridRowId);
            });
            setSelection(selectedRowData);
          }}
          //disableSelectionOnClick
        />
      </Paper>
    </Box>
  );
});

export default CardOverview;
