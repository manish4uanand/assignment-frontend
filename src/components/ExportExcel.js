import React from 'react'
import ReactExport from "react-export-excel";
import { Button } from '@material-ui/core'

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


export default function ExportExcel({ products }) {
  return (
    <div>
      <ExcelFile element={<Button variant="contained" color="primary" style={{ margin: 10 }}>Download Data</Button>}>
        <ExcelSheet data={products} name="Products List">
            <ExcelColumn label="Id" value="id"/>
            <ExcelColumn label="Name" value="name"/>
            <ExcelColumn label="Price" value="price"/>
            <ExcelColumn label="Material" value="material"/>
            <ExcelColumn label="Category" value="category"/>
            <ExcelColumn label="Color" value="color"/>
        </ExcelSheet>
      </ExcelFile>
    </div>
  )
}
