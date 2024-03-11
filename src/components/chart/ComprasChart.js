import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import Papa from 'papaparse';
import classes from './Chart.module.css'

function ComprasChart(props) {
  let charType = "LineChart"

  let [csvData, setCsvData] = useState([]);

  useEffect(() => {
    const fetchCSV = async () => {
      try {
        const response = await fetch(
          "https://docs.google.com/spreadsheets/d/1cQg0DT1ooBAQammz7YYN_fZJJOYxWILeXcPazmDHJnI/gviz/tq?tqx=out:csv&sheet=Compras");
        const csvText = await response.text();
        const result = Papa.parse(csvText, { header: true });
        setCsvData(result.data);
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
      csvData = csvData.filter((row) => row.mes == props.mes)
    }

    let chartData

    if (props.tamanos_props.includes(props.tamano)) {
      console.log("HEEEEREEEEE")
      chartData = [["Meses", props.tamano]]
      csvData.forEach((row) => {
        chartData.push([row.mes, parseFloat(row[props.tamano])]);
        if (row[props.tamano] > max_value) {
          max_value = row[props.tamano]
        }
      });
    }
    else {
      chartData = [["Meses", "Chico", "Mediano", "Grande"]]
      csvData.forEach((row) => {
        chartData.push([row.mes, parseFloat(row.chico), parseFloat(row.mediano), parseFloat(row.grande)]);
        if (parseFloat(row.chico) > max_value) {
          max_value = row[props.tamano]
        }
        if (parseFloat(row.mediano) > max_value) {
          max_value = row[props.tamano]
        }
        if (parseFloat(row.grande) > max_value) {
          max_value = row[props.tamano]
        }
      });
    }

    console.log("MAX VALUE ,", max_value)

    return <Chart
      width={'100%'}
      height={'100%'}
      className={classes["chart_"]}
      chartType={charType}
      loader={<div>Loading Chart</div>}
      data={chartData}
      options={{
        title: '[CAJAS de jalapeno compradas]',
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


  return <div className={classes['chart']} >
    {formatDataForGoogleCharts()}
  </div>
}

export default ComprasChart;
