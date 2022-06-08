import React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import RecommendIcon from "@mui/icons-material/Recommend";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { visuallyHidden } from "@mui/utils";
import { useStore } from "../hooks/useStore";
import Collapse from "@mui/material/Collapse";
import { useNavigate } from "react-router-dom";
import { useAPI } from "../hooks/useAPI";
import { observer } from "mobx-react-lite";
import {
  GridColDef,
  GridValueGetterParams,
  DataGrid,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { LinearProgress } from "@mui/material";

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

  const navigate = useNavigate();

  const [pageSize, setPageSize] = React.useState<number>(25);

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
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </GridToolbarContainer>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, height: 800 }}>
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
          disableSelectionOnClick
        />
      </Paper>
    </Box>
  );
});

export default CardOverview;
