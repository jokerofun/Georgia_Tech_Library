import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import { useStore } from "../hooks/useStore";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import {
  GridColDef,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
  DataGrid,
} from "@mui/x-data-grid";
import { ItemDto } from "../api";

const columns: GridColDef[] = [
  {
    field: "isbn",
    headerName: "ISBN",
    width: 150,
  },
  {
    field: "title",
    headerName: "Title",
    width: 150,
  },
  {
    field: "edition",
    headerName: "Edition",
    width: 100,
  },
  {
    field: "publisher",
    headerName: "Publisher",
    width: 150,
  },
  {
    field: "dateOfPublishing",
    headerName: "Date of publishing",
    type: "date",
    width: 200,
  },
  {
    field: "itemType",
    headerName: "Item type",
    width: 150,
    valueGetter: ({ row }) => row.itemType.name,
  },
  {
    field: "Authors",
    headerName: "Authors",
    width: 200,
    valueGetter: ({ row }: { row: ItemDto }) =>
      row.authors.map((a) => a.lastName),
  },
  {
    field: "Subjects",
    headerName: "Subjects",
    width: 200,
    valueGetter: ({ row }: { row: ItemDto }) => row.subjects.map((s) => s.name),
  },
];

const ItemOverview = observer(function ItemOverview() {
  const itemStore = useStore("itemStore");

  const navigate = useNavigate();

  // const [pageSize, setPageSize] = React.useState<number>(25);

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
              navigate(`/items/create`);
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
          rows={itemStore.items}
          columns={columns}
          getRowId={(i) => i.isbn}
          pageSize={100}
          // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          // rowsPerPageOptions={[10, 25, 50]}
          rowThreshold={0}
          checkboxSelection
          // disableSelectionOnClick
        />
      </Paper>
    </Box>
  );
});

export default ItemOverview;
