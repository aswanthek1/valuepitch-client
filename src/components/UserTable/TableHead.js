import { TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'

const TableHeadPart = () => {
  const headers = ['No', 'Name', 'Email', 'Date Of Birth', 'Country', 'Address', 'Edit', 'Delete'  ]
  return (

      <TableHead sx={{ backgroundColor: "aquamarine", color: "white" }}>
            <TableRow>
              {headers.map((obj) =>               
            <TableCell align="center">{obj}</TableCell>
              )}             
            </TableRow>
          </TableHead>
    
  )
}

export default TableHeadPart
