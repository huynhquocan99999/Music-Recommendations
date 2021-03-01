import React from 'react';
import { CSVLink } from 'react-csv';
import "./Excel.css"

const ExportReactCSV = ({csvData, fileName}) => {
    
    return (
        <div className= "excel"> 
            <button variant="warning" className="excel1">
            <CSVLink data={csvData} filename={fileName}>Download</CSVLink>
        </button>
        </div>
        
    )
}
export {ExportReactCSV};