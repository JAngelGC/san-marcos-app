import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import Papa from 'papaparse';


import classes from './Chart.module.css'

const meses = {
  "febrero": [],
  "marzo": [],
  "abril": [],
  "mayo": [],
  "junio": [],
  "julio": [],
  "agosto": [],
  "septiembre": [],
  "octubre": [],
  "noviembre": [],
  "diciembre": [],
  "enero": [],

}

let mesese_arr = [
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
  "enero"
]

// let products = []

function ProduccionChart(props) {

  let [products, setProducts] = useState([])
  let charType = "LineChart"
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    const fetchCSV = async () => {
      try {
        const response = await fetch(
          "https://docs.google.com/spreadsheets/d/1cQg0DT1ooBAQammz7YYN_fZJJOYxWILeXcPazmDHJnI/gviz/tq?tqx=out:csv&sheet=Produccion");
        const csvText = await response.text();
        const result = Papa.parse(csvText, { header: true });
        setCsvData(result.data);

        // (result.data).forEach((row) => {
        //   if (products.length <= 22) {
        //     products.push(row["nombre"])
        //     for (let mes in meses) {
        //       meses[mes].push(row[mes])
        //     }
        //   }
        // })

        (result.data).forEach((row) => {
          if (products.length <= 22) {
            products.push(row["nombre"])
          }
          if (meses["febrero"].length <= 22) {
            for (let mes in meses) {
              meses[mes].push(row[mes])
            }
          }
        })

      } catch (error) {
        console.error('Error fetching CSV:', error);
      }
    };

    fetchCSV();
  }, []);


  const formatDataForGoogleCharts = () => {

    let max_value = 0

    if (props.meses_props.includes(props.mes)) {
      charType = "ColumnChart"
      mesese_arr = [props.mes]
    }

    let chartData
    let idxProducto
    if (props.prods_props.includes(props.producto)) {
      idxProducto = products.indexOf(props.producto)
      products = [props.producto]
      chartData = [["Nombre", ...products]]
      mesese_arr.forEach((mes, index) => {
        const arr_mes = parseFloat(meses[mes][idxProducto])
        chartData.push([mes, arr_mes])
        max_value = arr_mes
      })
    }
    else {
      // All products
      chartData = [["Nombre", ...products]]
      mesese_arr.forEach((mes, index) => {
        const arr_mes = meses[mes].map((mes) => parseFloat(mes))
        chartData.push([mes, ...arr_mes])
        arr_mes.forEach((mes) => {
          if (mes > max_value) {
            max_value = mes
          }
        })
      })
    }


    return <Chart
      width={'100%'}
      height={'100%'}
      className={classes["chart_"]}
      chartType={charType}
      loader={<div>Loading Chart</div>}
      data={chartData}
      options={{
        title: 'Producción por mes',
        hAxis: { title: 'Mes' },
        legend: 'right',
        vAxis: {
          title: '[CAJAS] producidas',
          minValue: 0,  // Set the minimum value for the Y-axis
          maxValue: max_value + 200, // Set the maximum value for the Y-axis
        },
      }}
    />
  };

  return (
    <div className={classes['chart']} >
      {formatDataForGoogleCharts()}
    </div>
  );
}

export default ProduccionChart;
