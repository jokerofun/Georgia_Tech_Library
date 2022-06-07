// import React from "react";
// import { alpha } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
// import TableRow from "@mui/material/TableRow";
// import TableSortLabel from "@mui/material/TableSortLabel";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Paper from "@mui/material/Paper";
// import Checkbox from "@mui/material/Checkbox";
// import IconButton from "@mui/material/IconButton";
// import Tooltip from "@mui/material/Tooltip";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Switch from "@mui/material/Switch";
// import DoneIcon from "@mui/icons-material/Done";
// import CloseIcon from "@mui/icons-material/Close";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";
// import FilterListIcon from "@mui/icons-material/FilterList";
// import RecommendIcon from "@mui/icons-material/Recommend";
// import EditIcon from "@mui/icons-material/Edit";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import { visuallyHidden } from "@mui/utils";
// import { useStore } from "../hooks/useStore";
// import { HealthFacility } from "../api/models";
// import { observer } from "mobx-react-lite";
// import Collapse from "@mui/material/Collapse";
// import { useNavigate } from "react-router-dom";
// import { useAPI } from "../hooks/useAPI";
// import {
//   ApiHealthFacilitiesDeleteHealthFacilityGuidDeleteRequest,
//   ApiHealthFacilitiesGetOxygenRecommendationPostRequest,
//   HealthFacilitiesApi,
// } from "../api";
import { Box } from "@mui/material";

import { observer } from "mobx-react-lite";

// function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
//   let match = /\./.test(orderBy as string);

//   if (match) {
//     let properties = (orderBy as string).split(".");

//     if (
//       (b[properties[0] as keyof T] as unknown as T)[properties[1] as keyof T] <
//       (a[properties[0] as keyof T] as unknown as T)[properties[1] as keyof T]
//     ) {
//       return -1;
//     }
//     if (
//       (b[properties[0] as keyof T] as unknown as T)[properties[1] as keyof T] >
//       (a[properties[0] as keyof T] as unknown as T)[properties[1] as keyof T]
//     ) {
//       return 1;
//     }
//   }

//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// type Order = "asc" | "desc";

// function getComparator<Key extends keyof HealthFacility>(
//   order: Order,
//   orderBy: Key,
// ): (a: HealthFacility, b: HealthFacility) => number {
//   return order === "desc"
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// interface HeadCell {
//   id: any;
//   label: string;
//   numeric: boolean;
//   disablePadding: boolean;
// }

// const headCells: readonly HeadCell[] = [
//   {
//     id: "healthFacilityName",
//     numeric: false,
//     disablePadding: true,
//     label: "Health Facility Name",
//   },
//   {
//     id: "healthFacilityType.healthFacilityTypeName",
//     numeric: false,
//     disablePadding: false,
//     label: "Health Facility Type",
//   },
//   {
//     id: "ownership",
//     numeric: false,
//     disablePadding: false,
//     label: "Ownership",
//   },
//   {
//     id: "totalBeds",
//     numeric: false,
//     disablePadding: false,
//     label: "Total Beds",
//   },
//   {
//     id: "annualOPDPatients",
//     numeric: false,
//     disablePadding: false,
//     label: "Annual OPD Patients",
//   },
//   {
//     id: "bedOccupancyRate",
//     numeric: false,
//     disablePadding: false,
//     label: "Bed Occupancy Rate",
//   },
//   {
//     id: "bedTurnoverRate",
//     numeric: false,
//     disablePadding: false,
//     label: "Bed Turnover Rate",
//   },
//   {
//     id: "avgHoursOfPowerPerDay",
//     numeric: false,
//     disablePadding: false,
//     label: "Avg Hours Of Power Per Day",
//   },
//   {
//     id: "oxygenAvailability.oxygenAvailabilityName",
//     numeric: false,
//     disablePadding: false,
//     label: "Oxygen Availability",
//   },
//   {
//     id: "isPipedForSupply",
//     numeric: false,
//     disablePadding: false,
//     label: "Is Piped For Supply",
//   },
//   {
//     id: `location.adminLevel1`,
//     numeric: false,
//     disablePadding: false,
//     label: "Admin Level 1",
//   },
//   {
//     id: "location.adminLevel2",
//     numeric: false,
//     disablePadding: false,
//     label: "Admin Level 2",
//   },
//   {
//     id: "location.adminLevel3",
//     numeric: false,
//     disablePadding: false,
//     label: "Admin Level 3",
//   },
//   {
//     id: "location.latitude",
//     numeric: false,
//     disablePadding: false,
//     label: "Latitude",
//   },
//   {
//     id: "location.longitude",
//     numeric: false,
//     disablePadding: false,
//     label: "Longitude",
//   },
// ];

// interface EnhancedTableProps {
//   numSelected: number;
//   onRequestSort: (
//     event: React.MouseEvent<unknown>,
//     property: keyof HealthFacility,
//   ) => void;
//   onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   order: Order;
//   orderBy: string;
//   rowCount: number;
// }

// function EnhancedTableHead(props: EnhancedTableProps) {
//   const {
//     onSelectAllClick,
//     order,
//     orderBy,
//     numSelected,
//     rowCount,
//     onRequestSort,
//   } = props;
//   const createSortHandler =
//     (property: keyof HealthFacility) => (event: React.MouseEvent<unknown>) => {
//       onRequestSort(event, property);
//     };

//   return (
//     <TableHead>
//       <TableRow>
//         <TableCell
//           align="center"
//           colSpan={1}
//           style={{ background: "whitesmoke" }}
//         ></TableCell>
//         <TableCell
//           align="center"
//           colSpan={1}
//           style={{ background: "whitesmoke" }}
//         ></TableCell>
//         <TableCell
//           align="center"
//           colSpan={10}
//           // style={{ background: "whitesmoke" }}
//           style={{ background: "#1FD496", fontWeight: "bold" }}
//         >
//           Details
//         </TableCell>
//         <TableCell
//           align="center"
//           colSpan={5}
//           // style={{ background: "whitesmoke" }}
//           style={{ background: "yellow", fontWeight: "bold" }}
//         >
//           Location
//         </TableCell>
//       </TableRow>
//       <TableRow
//         style={{ background: "whitesmoke", borderBottom: "3px solid grey" }}
//       >
//         <TableCell padding="checkbox">
//           <Checkbox
//             color="primary"
//             indeterminate={numSelected > 0 && numSelected < rowCount}
//             checked={rowCount > 0 && numSelected === rowCount}
//             onChange={onSelectAllClick}
//             inputProps={{
//               "aria-label": "select all desserts",
//             }}
//           />
//         </TableCell>
//         <TableCell style={{ padding: 30 }}></TableCell>
//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             align={headCell.numeric ? "right" : "left"}
//             // padding={headCell.disablePadding ? "none" : "normal"}
//             sortDirection={orderBy === headCell.id ? order : false}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : "asc"}
//               onClick={createSortHandler(headCell.id as keyof HealthFacility)}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <Box component="span" sx={visuallyHidden}>
//                   {order === "desc" ? "sorted descending" : "sorted ascending"}
//                 </Box>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// interface EnhancedTableToolbarProps {
//   numSelected: number;
//   handleDelete: () => Promise<void>;
//   getOxygenRecommendation: () => Promise<void>;
//   handleNavigateToEditForm: () => Promise<void>;
// }

// const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
//   const {
//     numSelected,
//     handleDelete,
//     getOxygenRecommendation,
//     handleNavigateToEditForm,
//   } = props;

//   const navigate = useNavigate();

//   return (
//     <Toolbar
//       sx={{
//         pl: { sm: 2 },
//         pr: { xs: 1, sm: 1 },
//         ...(numSelected > 0 && {
//           bgcolor: (theme) =>
//             alpha(
//               theme.palette.primary.main,
//               theme.palette.action.activatedOpacity,
//             ),
//         }),
//       }}
//     >
//       {numSelected > 0 ? (
//         <Typography
//           sx={{ flex: "1 1 100%" }}
//           color="inherit"
//           variant="subtitle1"
//           component="div"
//         >
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography
//           sx={{ flex: "1 1 100%" }}
//           variant="h6"
//           id="tableTitle"
//           component="div"
//         >
//           Health Facilities
//         </Typography>
//       )}
//       <Tooltip title="Create">
//         <IconButton
//           onClick={(event) => {
//             event.stopPropagation();
//             navigate(`/healthFacilities/create`);
//           }}
//         >
//           <AddIcon />
//         </IconButton>
//       </Tooltip>
//       {numSelected === 1 && (
//         <Tooltip title="Get Oxygen Recommendation">
//           <IconButton onClick={getOxygenRecommendation}>
//             <RecommendIcon />
//           </IconButton>
//         </Tooltip>
//       )}
//       {numSelected === 1 && (
//         <Tooltip title="Edit Selected Health Facility">
//           <IconButton onClick={handleNavigateToEditForm}>
//             <EditIcon />
//           </IconButton>
//         </Tooltip>
//       )}
//       {numSelected > 0 ? (
//         <Tooltip title="Delete">
//           <IconButton onClick={handleDelete}>
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       ) : (
//         <Tooltip title="Filter list">
//           <IconButton>
//             <FilterListIcon />
//           </IconButton>
//         </Tooltip>
//       )}
//     </Toolbar>
//   );
// };

// function Row(props: {
//   hf: HealthFacility;
//   index: number;
//   isSelected: (hf: HealthFacility) => boolean;
//   handleClick: (
//     event: React.MouseEvent<unknown>,
//     healthFacility: HealthFacility,
//   ) => void;
// }) {
//   const { hf, index, isSelected, handleClick } = props;
//   const [open, setOpen] = React.useState(false);

//   const isItemSelected = isSelected(hf);
//   const labelId = `oxygenPlant-table-checkbox-${index}`;

//   return (
//     <React.Fragment>
//       <TableRow
//         hover
//         aria-checked={isItemSelected}
//         tabIndex={-1}
//         key={hf.healthFacilityGuid}
//         selected={isItemSelected}
//         // style={{ borderBottom: 0 }}
//       >
//         <TableCell padding="checkbox">
//           <Checkbox
//             onClick={(event) => handleClick(event, hf)}
//             color="primary"
//             checked={isItemSelected}
//             inputProps={{
//               "aria-labelledby": labelId,
//             }}
//           />
//         </TableCell>
//         <TableCell padding="checkbox">
//           <IconButton
//             aria-label="expand row"
//             size="small"
//             onClick={() => setOpen(!open)}
//           >
//             {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//           </IconButton>
//         </TableCell>
//         <TableCell component="th" id={labelId} scope="row" padding="none">
//           {hf.healthFacilityName}
//         </TableCell>
//         <TableCell>{hf.healthFacilityType.healthFacilityTypeName}</TableCell>
//         <TableCell>{hf.ownership}</TableCell>
//         <TableCell>{hf.totalBeds}</TableCell>
//         <TableCell>{hf.annualOPDPatients}</TableCell>
//         <TableCell>{hf.bedOccupancyRate}</TableCell>
//         <TableCell>{hf.bedTurnoverRate}</TableCell>
//         <TableCell>{hf.avgHoursOfPowerPerDay}</TableCell>
//         <TableCell>{hf.oxygenAvailability?.oxygenAvailabilityName}</TableCell>
//         <TableCell>
//           {hf.isPipedForSupply ? (
//             <DoneIcon></DoneIcon>
//           ) : (
//             <CloseIcon></CloseIcon>
//           )}
//         </TableCell>
//         <TableCell>{hf.location?.adminLevel1}</TableCell>
//         <TableCell>{hf.location?.adminLevel2}</TableCell>
//         <TableCell>{hf.location?.adminLevel3}</TableCell>
//         <TableCell>{hf.location?.latitude}</TableCell>
//         <TableCell>{hf.location?.longitude}</TableCell>
//       </TableRow>
//       <TableRow>
//         <TableCell
//           style={
//             !open
//               ? {
//                   paddingBottom: 0,
//                   paddingTop: 0,
//                   borderBottomColor: "white",
//                 }
//               : { borderTop: "2px solid white" }
//           }
//           colSpan={9}
//         >
//           <Collapse in={open} timeout="auto" unmountOnExit>
//             <Box sx={{ margin: 1 }}>
//               <Typography variant="h6" gutterBottom component="div">
//                 Beds
//               </Typography>
//               <Table size="small" aria-label="purchases">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell
//                       align="center"
//                       colSpan={9}
//                       // style={{ background: "whitesmoke" }}
//                       style={{ background: "#00aff2", fontWeight: "bold" }}
//                     >
//                       Details
//                     </TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell>Bed Type</TableCell>
//                     <TableCell>Amount</TableCell>
//                     <TableCell align="right">Hypoxemia Prevelance</TableCell>
//                     <TableCell align="right">Oxygen Flowrate</TableCell>
//                     <TableCell align="right">Oxygen Therapy Duration</TableCell>
//                     <TableCell align="right">
//                       Requires High Pressure Oxygen
//                     </TableCell>
//                     <TableCell align="right">Proportion Of Adults</TableCell>
//                     <TableCell align="right">Proportion Of Pediatric</TableCell>
//                     <TableCell align="right">Proportion Of Neonate</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {hf.beds?.map((bed) => (
//                     <TableRow key={bed.bedGuid}>
//                       <TableCell component="th" scope="row">
//                         {bed.bedType.bedTypeName}
//                       </TableCell>
//                       <TableCell>{bed.amount}</TableCell>
//                       <TableCell>{bed.hypoxemiaPrevalence}</TableCell>
//                       <TableCell>{bed.oxygenFlowrate}</TableCell>
//                       <TableCell>{bed.oxygenTherapyDuration}</TableCell>
//                       <TableCell>
//                         {bed.requiresHighPressureOxygen ? (
//                           <DoneIcon></DoneIcon>
//                         ) : (
//                           <CloseIcon></CloseIcon>
//                         )}
//                       </TableCell>
//                       <TableCell>{bed.proportionOfAdults}</TableCell>
//                       <TableCell>{bed.proportionOfPediatric}</TableCell>
//                       <TableCell>{bed.proportionOfNeonate}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </Box>
//           </Collapse>
//         </TableCell>
//       </TableRow>
//     </React.Fragment>
//   );
// }

const CatalogOverview = observer(function CatalogOverview() {
  //   const [order, setOrder] = React.useState<Order>("asc");
  //   const [orderBy, setOrderBy] =
  //     React.useState<keyof HealthFacility>("healthFacilityName");
  //   const [selected, setSelected] = React.useState<HealthFacility[]>([]);
  //   const [page, setPage] = React.useState(0);
  //   const [dense, setDense] = React.useState(false);
  //   const [rowsPerPage, setRowsPerPage] = React.useState(5);
  //   const healthFacilityStore = useStore("healthFacilityStore");
  //   const formStore = useStore("formStore");
  //   const healthFacilitiesApi = useAPI(HealthFacilitiesApi);
  //   const navigate = useNavigate();
  //   const handleRequestSort = (
  //     event: React.MouseEvent<unknown>,
  //     property: keyof HealthFacility,
  //   ) => {
  //     const isAsc = orderBy === property && order === "asc";
  //     setOrder(isAsc ? "desc" : "asc");
  //     setOrderBy(property);
  //   };
  //   const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     if (event.target.checked) {
  //       const newSelecteds = healthFacilityStore.healthFacilities.map((n) => n);
  //       setSelected(newSelecteds);
  //       return;
  //     }
  //     setSelected([]);
  //   };
  //   const handleClick = (
  //     event: React.MouseEvent<unknown>,
  //     healthFacility: HealthFacility,
  //   ) => {
  //     const selectedIndex = selected.indexOf(healthFacility);
  //     let newSelected: HealthFacility[] = [];
  //     if (selectedIndex === -1) {
  //       newSelected = newSelected.concat(selected, healthFacility);
  //     } else if (selectedIndex === 0) {
  //       newSelected = newSelected.concat(selected.slice(1));
  //     } else if (selectedIndex === selected.length - 1) {
  //       newSelected = newSelected.concat(selected.slice(0, -1));
  //     } else if (selectedIndex > 0) {
  //       newSelected = newSelected.concat(
  //         selected.slice(0, selectedIndex),
  //         selected.slice(selectedIndex + 1),
  //       );
  //     }
  //     setSelected(newSelected);
  //   };
  //   const handleChangePage = (event: unknown, newPage: number) => {
  //     setPage(newPage);
  //   };
  //   const handleChangeRowsPerPage = (
  //     event: React.ChangeEvent<HTMLInputElement>,
  //   ) => {
  //     setRowsPerPage(parseInt(event.target.value, 10));
  //     setPage(0);
  //   };
  //   const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setDense(event.target.checked);
  //   };
  //   const isSelected = (hf: HealthFacility) => selected.indexOf(hf) !== -1;
  //   // Avoid a layout jump when reaching the last page with empty rows.
  //   const emptyRows =
  //     page > 0
  //       ? Math.max(
  //           0,
  //           (1 + page) * rowsPerPage -
  //             healthFacilityStore.healthFacilities.length,
  //         )
  //       : 0;
  //   async function handleDeleteHealthFacilities() {
  //     selected.forEach(async (hf) => {
  //       const requestParameters: ApiHealthFacilitiesDeleteHealthFacilityGuidDeleteRequest =
  //         {
  //           healthFacilityGuid: hf.healthFacilityGuid as string,
  //         };
  //       await healthFacilitiesApi.apiHealthFacilitiesDeleteHealthFacilityGuidDelete(
  //         requestParameters,
  //       );
  //     });
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     healthFacilityStore.fetch();
  //   }
  //   async function getOxygenRecommendation() {
  //     const requestParameters: ApiHealthFacilitiesGetOxygenRecommendationPostRequest =
  //       {
  //         healthFacility: selected[0],
  //       };
  //     const oxygenRecommendation =
  //       await healthFacilitiesApi.apiHealthFacilitiesGetOxygenRecommendationPost(
  //         requestParameters,
  //       );
  //     alert(JSON.stringify(oxygenRecommendation, null, 2));
  //   }
  //   async function handleNavigateToEditForm() {
  //     await formStore.setHealthFacilityToModify(selected[0]);
  //     navigate(`/healthFacilities/edit`);
  //   }
  return (
    <Box sx={{ width: "100%" }}>
      {/* <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            handleDelete={handleDeleteHealthFacilities}
            getOxygenRecommendation={getOxygenRecommendation}
            handleNavigateToEditForm={handleNavigateToEditForm}
          />
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
                rowCount={healthFacilityStore.healthFacilities.length}
              />
              <TableBody>
                {healthFacilityStore.healthFacilities
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .sort(getComparator(order, orderBy))
                  .map((hf, index) => {
                    return (
                      <Row
                        key={hf.healthFacilityGuid}
                        hf={hf}
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
            count={healthFacilityStore.healthFacilities.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        /> */}
    </Box>
  );
});

export default CatalogOverview;
