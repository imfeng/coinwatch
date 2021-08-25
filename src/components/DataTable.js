import React from 'react';
import PropTypes from 'prop-types'
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
const columns = [
   {
     name: "Pair",
     selector: "pair",
     sortable: true
   },
   {
     name: "Price",
     selector: "price",
     sortable: true
   },
   {
     name: "Price Margin",
     selector: "p_margin",
     sortable: true,
     cell: ({p_margin}) => <span className={getPosNegClass(p_margin)}>{(p_margin)}%</span>
   },
   {
     name: "Volume Avr Margin",
     selector: "v_margin_avr",
     sortable: true,
     cell: ({v_margin_avr}) => <span className={getPosNegClass(v_margin_avr)}>{(v_margin_avr)}%</span>
   },
   {
     name: "Volume Past Margin",
     selector: "v_margin_past",
     sortable: true,
     cell: ({v_margin_past}) => <span className={getPosNegClass(v_margin_past)}>{(v_margin_past)}%</span>
   }
 ];
const DataTableComponent = ({data}) => {
    return (
       <div>
         {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
         <DataTable
            columns={columns}
            data={data}
            noHeader
            defaultSortField="id"
            defaultSortAsc={false}
            pagination
            highlightOnHover
          />
       </div>
    );
  };
  
  export default DataTableComponent;
  

  function getPosNegClass(num) {
     return num > 0 ? 'postive' : 'negative';
  }