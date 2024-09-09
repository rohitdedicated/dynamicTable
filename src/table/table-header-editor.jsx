import React, { useState } from "react";
import {
  Grid,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Paper,
  IconButton,
  TextField,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Box,
  Tab,
  Tabs,
  Tooltip,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {
  EditOutlined as EditIcon,
  DeleteOutline as DeleteIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";

const ExhibitTableRow = ({
  cellIdx,
  cell,
  updateHeaderCell,
  deleteHeaderCell,
  lookupData,
}) => {
  const [headingStyleFlag, setHeadingStyleFlag] = useState(false);
  return (
    <>
      <TableRow>
        <TableCell>
          <TextField
            id={`txtCellLabel-${cellIdx}`}
            variant="outlined"
            size="small"
            value={cell.label}
            onChange={(e) => {
              updateHeaderCell(cellIdx, "label", e.target.value);
            }}
          />
        </TableCell>
        <TableCell>
          <TextField
            id={`txtCellColSpan-${cellIdx}`}
            variant="outlined"
            size="small"
            value={cell.colSpan}
            onChange={(e) => {
              updateHeaderCell(cellIdx, "colSpan", e.target.value);
            }}
            type="number"
          />
        </TableCell>
        <TableCell>
          <TextField
            id={`txtCellRowSpan-${cellIdx}`}
            variant="outlined"
            size="small"
            value={cell.rowSpan}
            onChange={(e) => {
              updateHeaderCell(cellIdx, "rowSpan", e.target.value);
            }}
            type="number"
          />
        </TableCell>
        <TableCell>
          <TextField
            id={`txtCellRowSpan-${cellIdx}`}
            variant="outlined"
            size="small"
            value={cell.displayOrder}
            onChange={(e) => {
              updateHeaderCell(cellIdx, "displayOrder", e.target.value);
            }}
            type="number"
          />
        </TableCell>
        <TableCell>
          <Checkbox
            checked={cell.enabled === "Y"}
            onChange={(e) => {
              updateHeaderCell(
                cellIdx,
                "enabled",
                e.target.checked ? "Y" : "N",
              );
            }}
            inputProps={{ "aria-label": "controlled" }}
          />
        </TableCell>
        <TableCell>
          <div style={{ display: "flex", textAlign: "center" }}>
            {/* <Tooltip title="Config Styles">
                <IconButton
                  color="primary"
                  size="small"
                  onClick={() => setHeadingStyleFlag(true)}
                >
                  <SettingsIcon style={{ fontSize: "18px" }} />
                </IconButton>
              </Tooltip> */}
            <Tooltip title="Delete">
              <IconButton
                color="error"
                size="small"
                onClick={() => deleteHeaderCell(cellIdx)}
              >
                <DeleteIcon style={{ fontSize: "18px" }} />
              </IconButton>
            </Tooltip>
          </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6}>
          {headingStyleFlag && (
            <Grid item xs={12}>
              <Styling
                cellIdx={cellIdx}
                cell={cell}
                updateHeaderCell={updateHeaderCell}
                lookupData={lookupData}
              />
            </Grid>
          )}
        </TableCell>
      </TableRow>
    </>
  );
};

const TableHeaderEditor = ({
  headers,
  setHeaders,
  headerObj,
  setHeaderObj,
  selectedHeaderIdx,
  setSelectedHeaderIdx,
  openHeaderDialog,
  onCloseHeaderDialog,
  lookupData,
}) => {
  const onUpdateHeaderObj = (key, value) => {
    setHeaderObj((oldObj) => {
      return {
        ...oldObj,
        [key]: value,
      };
    });
  };

  const onAddHeaderCell = () => {
    onUpdateHeaderObj("cells", [
      ...headerObj.cells,
      {
        label: "header-1",
      },
    ]);
  };

  const updateHeaderCell = (cellIdx, key, value) => {
    onUpdateHeaderObj("cells", [
      ...headerObj.cells.slice(0, cellIdx),
      { ...headerObj.cells[cellIdx], [key]: value },
      ...headerObj.cells.slice(cellIdx + 1),
    ]);
  };

  const deleteHeaderCell = (cellIdx) => {
    onUpdateHeaderObj("cells", [
      ...headerObj.cells.slice(0, cellIdx),
      ...headerObj.cells.slice(cellIdx + 1),
    ]);
  };

  const saveHeaderRow = () => {
    if (selectedHeaderIdx || selectedHeaderIdx === 0) {
      setHeaders((oldHeaders) => {
        return [
          ...oldHeaders.slice(0, selectedHeaderIdx),
          headerObj,
          ...oldHeaders.slice(selectedHeaderIdx + 1),
        ];
      });
    } else {
      setHeaders((oldHeaders) => {
        return [...oldHeaders, headerObj];
      });
    }
    onCloseHeaderDialog();
  };

  return (
    <Dialog
      open={openHeaderDialog}
      onClose={onCloseHeaderDialog}
      maxWidth="sm"
      fullWidth={true}
      aria-labelledby="header-dialog"
    >
      <DialogTitle id="header-dialog">Header Row</DialogTitle>
      <DialogContent>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={1}
            justifyContent="flex-end"
            alignItems="center"
          >
            <Grid item>
              <Button size="small" variant="outlined" onClick={onAddHeaderCell}>
                Add Cell
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TableContainer>
                <Table sx={{ width: "100%" }} size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Label</TableCell>
                      <TableCell>ColSpan</TableCell>
                      <TableCell>RowSpan</TableCell>
                      <TableCell>Display Order</TableCell>
                      <TableCell>Active</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {headerObj.cells.length > 0 &&
                      headerObj.cells.map((cell, cellIdx) => (
                        <ExhibitTableRow
                          key={`cell-${cellIdx}`}
                          cellIdx={cellIdx}
                          cell={cell}
                          updateHeaderCell={updateHeaderCell}
                          deleteHeaderCell={deleteHeaderCell}
                          lookupData={lookupData}
                        />
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          variant="outlined"
          color="error"
          onClick={onCloseHeaderDialog}
        >
          Cancel
        </Button>
        <Button
          size="small"
          variant="outlined"
          onClick={saveHeaderRow}
          autoFocus
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TableHeaderEditor;
