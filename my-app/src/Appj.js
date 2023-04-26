import React, { useState, useEffect } from 'react';
import DataGrid, { Column, Export } from 'devextreme-react/data-grid';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import pic from "./images.png";

// Our demo infrastructure requires us to use 'file-saver-es'.
// We recommend that you use the official 'file-saver' package in your applications.
import { exportDataGrid } from 'devextreme/excel_exporter';

import service from './Appj1.js';

const Appj = () => {
  //   constructor(props) {
  //     super(props);
  //     this.employees = service.getEmployees();
  //     this.onExporting = this.onExporting.bind(this);
  //   }
  const [one, setone] = useState([])
  const [one1, setone1] = useState(service.getEmployees())
  const [one2, setone2] = useState(pic)

  useEffect(() => {

    // fetch("https://jsonplaceholder.typicode.com/users")
    fetch("https://63a96e89100b7737b991cd4b.mockapi.io/api/api")
      .then((res) => res.json())
      .then((json) => setone(json))


  })

  return (
    <div>
      <DataGrid
        id="gridContainer"
        dataSource={one1}
        //   keyExpr="ID"
        showBorders={true}
        showRowLines={true}
        showColumnLines={true}
        onExporting={onExporting}
      >
        
        {/* <Column dataField="Picture" width={90} cellRender={renderGridCell} />
        <Column dataField="FirstName" />
        <Column dataField="LastName" />
        <Column dataField="Position" />

        <Column dataField="BirthDate" dataType="date" />
        <Column dataField="HireDate" dataType="date" /> */}

        {/* <row dataField="Picture" width={90} cellRender={renderGridCell} /> */}
<Column dataField="Picture" width={90} cellRender={renderGridCell} /><br></br><br></br>
        <Column dataField="name" />
          <Column dataField="username" />
          <Column dataField="email" />
          <Column dataField="phone"  />
          <Column dataField="website" />

        <Export enabled={true} />
      </DataGrid>



      
    </div>
  );
}

const onExporting = (e) => {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet('Main sheet');

  exportDataGrid({
    component: e.component,
    worksheet,
    autoFilterEnabled: true,
    topLeftCell: { row: 2, column: 1 },
    customizeCell: ({ gridCell, excelCell }) => {
      if (gridCell.rowType === 'data') {
        if (gridCell.column.dataField === 'Picture') {
          excelCell.value = undefined;

          const image = workbook.addImage({
            base64: gridCell.value,
            extension: 'png',
          });

          worksheet.getRow(excelCell.row).height = 90;
          worksheet.addImage(image, {
            tl: { col: excelCell.col - 1, row: excelCell.row - 1 },
            br: { col: excelCell.col, row: excelCell.row },
          });
        }
      }
    },
  }).then(() => {
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
    });
  });
  e.cancel = true;
}

const renderGridCell = (cellData) => {
  return (<div><img src={cellData.value}></img></div>);
}


export default Appj;
