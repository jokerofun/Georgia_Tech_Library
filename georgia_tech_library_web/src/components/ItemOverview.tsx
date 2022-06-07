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
import { ItemDto } from "../api/models";
import { observer } from "mobx-react-lite";
import Collapse from "@mui/material/Collapse";
import { useNavigate } from "react-router-dom";
import { useAPI } from "../hooks/useAPI";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  let match = /\./.test(orderBy as string);

  if (match) {
    let properties = (orderBy as string).split(".");

    if (
      (b[properties[0] as keyof T] as unknown as T)[properties[1] as keyof T] <
      (a[properties[0] as keyof T] as unknown as T)[properties[1] as keyof T]
    ) {
      return -1;
    }
    if (
      (b[properties[0] as keyof T] as unknown as T)[properties[1] as keyof T] >
      (a[properties[0] as keyof T] as unknown as T)[properties[1] as keyof T]
    ) {
      return 1;
    }
  }

  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof ItemDto>(
  order: Order,
  orderBy: Key,
): (a: ItemDto, b: ItemDto) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
  id: any;
  label: string;
  numeric: boolean;
  disablePadding: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "isbn",
    numeric: false,
    disablePadding: true,
    label: "ISBN",
  },
  {
    id: "title",
    numeric: false,
    disablePadding: false,
    label: "Title",
  },
  {
    id: "edition",
    numeric: false,
    disablePadding: false,
    label: "Edition",
  },
  {
    id: "publisher",
    numeric: false,
    disablePadding: false,
    label: "Publisher",
  },
  {
    id: "dateOfPublishing",
    numeric: false,
    disablePadding: false,
    label: "Date Of Publishing",
  },
  {
    id: "itemType.name",
    numeric: false,
    disablePadding: false,
    label: "Bed Occupancy Rate",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof ItemDto,
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof ItemDto) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell
          align="center"
          colSpan={1}
          style={{ background: "whitesmoke" }}
        ></TableCell>
        <TableCell
          align="center"
          colSpan={1}
          style={{ background: "whitesmoke" }}
        ></TableCell>
        <TableCell
          align="center"
          colSpan={10}
          // style={{ background: "whitesmoke" }}
          style={{ background: "#1FD496", fontWeight: "bold" }}
        >
          Details
        </TableCell>
        <TableCell
          align="center"
          colSpan={5}
          // style={{ background: "whitesmoke" }}
          style={{ background: "yellow", fontWeight: "bold" }}
        >
          Location
        </TableCell>
      </TableRow>
      <TableRow
        style={{ background: "whitesmoke", borderBottom: "3px solid grey" }}
      >
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        <TableCell style={{ padding: 30 }}></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            // padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id as keyof ItemDto)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected } = props;

  const navigate = useNavigate();

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity,
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Items
        </Typography>
      )}
    </Toolbar>
  );
};

function Row(props: {
  item: ItemDto;
  index: number;
  isSelected: (item: ItemDto) => boolean;
  handleClick: (event: React.MouseEvent<unknown>, item: ItemDto) => void;
}) {
  const { item, index, isSelected, handleClick } = props;
  const [open, setOpen] = React.useState(false);

  const isItemSelected = isSelected(item);
  const labelId = `oxygenPlant-table-checkbox-${index}`;

  return (
    <React.Fragment>
      <TableRow
        hover
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={item.isbn}
        selected={isItemSelected}
        // style={{ borderBottom: 0 }}
      >
        <TableCell padding="checkbox">
          <Checkbox
            onClick={(event) => handleClick(event, item)}
            color="primary"
            checked={isItemSelected}
            inputProps={{
              "aria-labelledby": labelId,
            }}
          />
        </TableCell>
        <TableCell padding="checkbox">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" id={labelId} scope="row" padding="none">
          {item.isbn}
        </TableCell>
        <TableCell>{item.title}</TableCell>
        <TableCell>{item.publisher}</TableCell>
        <TableCell>{item.edition}</TableCell>
        <TableCell>{item.itemType.name}</TableCell>
        <TableCell>{item.dateOfPublishing}</TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const ItemOverview = observer(function ItemOverview() {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof ItemDto>("title");
  const [selected, setSelected] = React.useState<ItemDto[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const itemStore = useStore("itemStore");

  const navigate = useNavigate();

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof ItemDto,
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = itemStore.items.map((i) => i);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, item: ItemDto) => {
    const selectedIndex = selected.indexOf(item);
    let newSelected: ItemDto[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, item);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (i: ItemDto) => selected.indexOf(i) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - itemStore.items.length)
      : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={itemStore.items.length}
            />

            <TableBody>
              {itemStore.items
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .sort(getComparator(order, orderBy))
                .map((i, index) => {
                  return (
                    <Row
                      key={i.isbn}
                      item={i}
                      index={index}
                      isSelected={isSelected}
                      handleClick={handleClick}
                    />
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={itemStore.items.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
});

export default ItemOverview;
