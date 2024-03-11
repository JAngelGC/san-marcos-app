import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import Papa from 'papaparse';


import classes from './Chart.module.css'
import { useLocation } from 'react-router-dom';


const meses = {
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
  "febrero": []
}

let mesese_arr = [
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
  "enero",
  "febrero"
]

// let products = []

function ForecastChart(props) {

  let [products, setProducts] = useState([])
  let charType = "LineChart"
  const [csvData, setCsvData] = useState([]);


  const location = useLocation();


  useEffect(() => {
    const fetchCSV = async () => {
      try {
        const response = await fetch(
          "https://docs.google.com/spreadsheets/d/1cQg0DT1ooBAQammz7YYN_fZJJOYxWILeXcPazmDHJnI/gviz/tq?tqx=out:csv&sheet=Forecast");
        const csvText = await response.text();
        const result = Papa.parse(csvText, { header: true });
        setCsvData(result.data);

        (result.data).forEach((row) => {
          if (products.length <= 90) {
            products.push(row["nombre"])
          }
          if (meses["marzo"].length <= 90) {
            for (let mes in meses) {
              meses[mes].push(row[mes])
            }
          }
        })

        console.log("*********************************************")
        console.log("meses: ", meses)
        console.log("products: ", products)

      } catch (error) {
        console.error('Error fetching CSV:', error);
      }
    };

    fetchCSV();
    // console.log("INSIED USE EFFECTTT!!!!")

    // console.log(location.key)
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
        title: 'Forecast de ventas',
        hAxis: { title: 'Mes' },
        legend: 'right',
        vAxis: {
          title: '[CAJAS] forecast',
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

export default ForecastChart;
