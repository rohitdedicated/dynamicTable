import React, { useState, useEffect } from "react";
import { Grid, Typography, IconButton, Tooltip } from "@mui/material";
import {
  AddCircleOutlineOutlined as AddCircleOutlineOutlinedIcon,
  AddBoxOutlined as AddBoxOutlinedIcon,
} from "@mui/icons-material";
import TableRender from "./table-render";
import TableHeaderEditor from "./table-header-editor";
import TableRowEditor from "./table-row-editor";
const TableScreen = () => {
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);

  const [selectedHeaderIdx, setSelectedHeaderIdx] = useState(null);
  const [selectedRowIdx, setSelectedRowIdx] = useState(null);
  const [headerObj, setHeaderObj] = useState({ cells: [] });

  const [openHeaderDialog, setOpenHeaderDialog] = useState(false);
  const [rowObj, setRowObj] = useState({ cells: [] });
  const [openRowDialog, setOpenRowDialog] = useState(false);

  const onOpenHeaderDialog = (headerIdx) => {
    if (headerIdx || headerIdx === 0) {
      setSelectedHeaderIdx(headerIdx);
      setHeaderObj({ ...headers[headerIdx] });
    } else {
      setHeaderObj({ cells: [] });
    }
    setOpenHeaderDialog(true);
  };

  const onCloseHeaderDialog = () => {
    setSelectedHeaderIdx(null);
    setHeaderObj({ cells: [] });
    setOpenHeaderDialog(false);
  };

  const editHeaderRow = (headerRowIdx) => {
    onOpenHeaderDialog(headerRowIdx);
  };

  const deleteHeaderRow = (headerRowIdx) => {
    setHeaders((prevHeaders) => {
      return [
        ...prevHeaders.slice(0, headerRowIdx),
        ...prevHeaders.slice(headerRowIdx + 1),
      ];
    });
  };

  const onOpenRowDialog = (rowIdx) => {
    if (rowIdx || rowIdx === 0) {
      setSelectedRowIdx(rowIdx);
      setRowObj(rows[rowIdx]);
    } else {
      setRowObj({ cells: [] });
    }
    setOpenRowDialog(true);
  };

  const onCloseRowDialog = () => {
    setSelectedRowIdx(null);
    setRowObj({ cells: [] });
    setOpenRowDialog(false);
  };

  const editRow = (rowIdx) => {
    onOpenRowDialog(rowIdx);
  };

  const deleteRow = (rowIdx) => {
    setRows((prevRows) => {
      return [...prevRows.slice(0, rowIdx), ...prevRows.slice(rowIdx + 1)];
    });
  };

  console.log("mainRows", rows);

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Grid container spacing={2} justifyContent="space-between">
            <Grid item xs={12} sm={12} md={6} lg={8}>
              <Typography>Dynamic Table</Typography>
            </Grid>
            <Grid item>
              <Tooltip title="Add Header Row">
                <IconButton
                  size="small"
                  variant="outlined"
                  color="primary"
                  onClick={() => onOpenHeaderDialog()}
                >
                  <AddCircleOutlineOutlinedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add Body Row">
                <IconButton
                  size="small"
                  variant="outlined"
                  color="secondary"
                  onClick={() => onOpenRowDialog()}
                >
                  <AddBoxOutlinedIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TableRender
            headers={headers}
            editHeaderRow={editHeaderRow}
            deleteHeaderRow={deleteHeaderRow}
            rows={rows}
            editRow={editRow}
            deleteRow={deleteRow}
          />
        </Grid>
      </Grid>
      <TableHeaderEditor
        headers={headers}
        setHeaders={setHeaders}
        headerObj={headerObj}
        setHeaderObj={setHeaderObj}
        selectedHeaderIdx={selectedHeaderIdx}
        setSelectedHeaderIdx={setSelectedHeaderIdx}
        openHeaderDialog={openHeaderDialog}
        onCloseHeaderDialog={onCloseHeaderDialog}
      />

      <TableRowEditor
        rows={rows}
        setRows={setRows}
        rowObj={rowObj}
        setRowObj={setRowObj}
        selectedRowIdx={selectedRowIdx}
        setSelectedRowIdx={setSelectedRowIdx}
        openRowDialog={openRowDialog}
        onCloseRowDialog={onCloseRowDialog}
      />
    </div>
  );
};

export default TableScreen;
