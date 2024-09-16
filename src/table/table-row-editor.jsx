import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";

const TableRowEditor = ({
  rows,
  setRows,
  rowObj,
  setRowObj,
  selectedRowIdx,
  setSelectedRowIdx,
  openRowDialog,
  onCloseRowDialog,
}) => {
  const onUpdateRowObj = (key, value) => {
    setRowObj((oldObj) => {
      return {
        ...oldObj,
        [key]: value,
      };
    });
  };

  const onAddRowCell = () => {
    onUpdateRowObj("cells", [
      ...rowObj.cells,
      {
        label: "cell-1",
      },
    ]);
  };

  const updateRowCell = (cellIdx, key, value) => {
    onUpdateRowObj("cells", [
      ...rowObj.cells.slice(0, cellIdx),
      { ...rowObj.cells[cellIdx], [key]: value },
      ...rowObj.cells.slice(cellIdx + 1),
    ]);
  };

  const deleteRowCell = (cellIdx) => {
    onUpdateRowObj("cells", [
      ...rowObj.cells.slice(0, cellIdx),
      ...rowObj.cells.slice(cellIdx + 1),
    ]);
  };

  console.log("rowsss", rows);

  const saveRow = () => {
    if (selectedRowIdx || selectedRowIdx === 0) {
      setRows((oldHeaders) => {
        return [
          ...oldHeaders.slice(0, selectedRowIdx),
          rowObj,
          ...oldHeaders.slice(selectedRowIdx + 1),
        ];
      });
    } else {
      setRows((oldHeaders) => {
        return [...oldHeaders, rowObj];
      });
    }
    onCloseRowDialog();
  };

  return (
    <Dialog
      open={openRowDialog}
      onClose={onCloseRowDialog}
      maxWidth="md"
      fullWidth={true}
      aria-labelledby="row-dialog"
    >
      <DialogTitle id="row-dialog">Row</DialogTitle>
      <DialogContent>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={1}
            justifyContent="flex-end"
            alignItems="center"
          >
            <Grid item>
              <Button variant="outlined" onClick={onAddRowCell}>
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
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rowObj.cells.length > 0 &&
                      rowObj.cells.map((cell, cellIdx) => (
                        <TableRow key={`cell-${cellIdx}`}>
                          <TableCell>
                            <TextField
                              id={`txtCellLabel-${cellIdx}`}
                              variant="outlined"
                              size="small"
                              value={cell.label}
                              onChange={(e) => {
                                updateRowCell(cellIdx, "label", e.target.value);
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
                                updateRowCell(
                                  cellIdx,
                                  "colSpan",
                                  e.target.value,
                                );
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
                                updateRowCell(
                                  cellIdx,
                                  "rowSpan",
                                  e.target.value,
                                );
                              }}
                              type="number"
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              size="small"
                              varaint="danger"
                              onClick={() => deleteRowCell(cellIdx)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="error" onClick={onCloseRowDialog}>
          Cancel
        </Button>
        <Button variant="outlined" onClick={saveRow} autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TableRowEditor;
