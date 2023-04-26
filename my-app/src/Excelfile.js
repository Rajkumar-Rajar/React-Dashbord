import React from 'react'
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export const Excelfile = ({table1}) => {
  const fileType = "xlsx"





  const exportToCSV = () => {
    console.log("Excelfile")
    alert("hello")

    const ws = XLSX.utils.json_to_sheet(table1);
    const wb = { Sheets:{data:ws}, sheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, {bookType:"xlsx",type: "array" });
    const data = new Blob ([excelBuffer], {type:fileType});
    FileSaver.saveAs(data, "myfile" + ".xlsx")
  }

  return (
    <div>
      <button onClick={exportToCSV}>export 444</button>
      {/* <p>rtfhdddddddddrfgdjgdjytdjdkydddgdl</p> */}
    </div>
  )
}

// export default Excelfile