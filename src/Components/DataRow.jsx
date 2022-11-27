import { TableRow, TableCell, IconButton, Box } from '@mui/material';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react'
import "./main.css"

const DataRow = ({ row, onRowCheck, onRowDelete, onRowEdit, onClickEdit, token }) => {
  const initialValues = { ...row };
  const [editMode, setEditMode] = useState(false);
  const [editedValues, setEditedValues] = useState(initialValues);

  useEffect(() => {
    setEditedValues(row)
  }, [row])

  useEffect(() => {
    token === row.id ? setEditMode(true) : setEditMode(false);
  }, [token, row.id])

  const handleCheck = () => onRowCheck(row.id);

  const handleDelete = () => onRowDelete(row.id);

  const handleEdit = (e) => {
    if (editMode) {
      const { name, value } = e.target;
      setEditedValues({
        ...editedValues,
        [name]: value,
      });
    }
  }

  const handleCancel = () => {
    setEditedValues(initialValues);
    setEditMode(false);
    onClickEdit(null);
  }

  const handleSave = () => {
    onRowEdit(editedValues);
    setEditMode(false);
    onClickEdit(null);
  }

  const handleEditMode = () => {
    onClickEdit(row.id);
  }

  return (
    <TableRow className={row.isChecked ? "selected" : ""}>
      <TableCell><input type="checkbox" onChange={handleCheck} checked={row.isChecked ? "checked" : ""} /></TableCell>
      <TableCell>
        <Box >
          <input className={`data${row.isChecked ? " selected" : ""}${editMode ? " editable" : " view"}`}
            name="name"
            value={editedValues.name}
            onChange={handleEdit} />
        </Box>
      </TableCell>
      <TableCell>
        <Box>
          <input className={`data${row.isChecked ? " selected" : ""}${editMode ? " editable" : " view"}`}
            name="email"
            value={editedValues.email}
            onChange={handleEdit} />
        </Box>
      </TableCell>
      <TableCell>
        <Box>
          <input className={`data${row.isChecked ? " selected" : ""}${editMode ? " editable" : " view"}`}
            name="role"
            value={editedValues.role}
            onChange={handleEdit} />
        </Box>
      </TableCell>
      <TableCell>
        <Box>
          {editMode ?
            <>
            <IconButton color='secondary' onClick={handleSave}>
                <SaveAsIcon/>
            </IconButton>
            <IconButton color='secondary' onClick={handleCancel}>
                <CloseIcon/>
            </IconButton>
            </>
            : <>
            <IconButton color='secondary' onClick={handleEditMode}>
                <EditIcon/>
            </IconButton>
            <IconButton color='secondary' onClick={handleDelete}>
                <DeleteIcon/>
            </IconButton>
            </>}
        </Box>
      </TableCell>
    </TableRow>
  )
}

export default DataRow
