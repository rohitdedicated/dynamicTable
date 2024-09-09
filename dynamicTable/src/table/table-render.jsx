import {
  Grid,
  Typography,
  IconButton,
  Tooltip,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  Box,
  Button,
  TableRow,
  Paper,
} from "@mui/material";
import {
  EditOutlined as EditIcon,
  DeleteOutline as DeleteIcon,
} from "@mui/icons-material";
const TableRender = (
  headers,
  editHeaderRow,
  deleteHeaderRow,
  rows,
  editRow,
  deleteRow,
) => {
  console.log("hii");
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%" }} size="small">
          <TableHead>
            {headers.length > 0 &&
              headers.map((headerRow, headerRowIdx) => (
                <TableRow key={`headerRow-${headerRowIdx}`}>
                  {headerRow.cells.length > 0 &&
                    headerRow.cells.map((headerRowCell, headerRowCellIdx) => (
                      <TableCell
                        key={`headerRowCell-${headerRowIdx}-${headerRowCellIdx}`}
                        colSpan={headerRowCell.colSpan}
                        rowSpan={headerRowCell.rowSapn}
                        // style={{}}
                      >
                        {console.log(
                          "headerRowCell.label",
                          headerRowCell.label,
                        )}
                        {headerRowCell.label}
                      </TableCell>
                    ))}

                  {headerRow.cells.length === 0 && (
                    <TableCell>No Data to Show</TableCell>
                  )}

                  <TableCell align="center">
                    <Tooltip title="Edit Header">
                      <IconButton
                        size="small"
                        onClick={() => editHeaderRow(headerRowIdx)}
                      >
                        <EditIcon color="primary" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Header">
                      <IconButton
                        size="small"
                        onClick={() => deleteHeaderRow(headerRowIdx)}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableHead>
          <TableBody>
            {rows?.length > 0 &&
              rows.map((row, rowIdx) => (
                <TableRow
                  key={`row-${rowIdx}`}
                  sx={{ "&:last-child td,&:last-child th": { border: 0 } }}
                >
                  {row.cells.length > 0 &&
                    row.cells.map((rowCell, rowCellIdx) => (
                      <TableCell
                        key={`rowCell-${rowIdx}-${rowCellIdx}`}
                        colSpan={rowCell.colSpan}
                        rowSpan={rowCell.rowSpan}
                      >
                        {rowCell.label}
                      </TableCell>
                    ))}

                  {row.cells.length > 0 && <TableCell>No Cell Data</TableCell>}

                  <TableCell align="center">
                    <Tooltip title="Edit Columns">
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => editRow(rowIdx)}
                      >
                        <EditIcon style={{ fontSize: "18px" }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Columns">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => deleteRow(rowIdx)}
                      >
                        <DeleteIcon style={{ fontSize: "18px" }} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default TableRender;
