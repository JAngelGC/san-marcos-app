import { useState } from "react";
import ForecastChart from "../components/chart/ForecastChart"
import Card from "../components/ui/Card";
import MyDropdown from "../components/ui/MyDropdown";
import classes from './Page.module.css'

const meses = [
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

const products = [
    "JALAPEÑOS ENTEROS ELMIGO 215G HNPI",
    "JALAPEÑO ENTERO MLHR 24/215G",
    "WHOLE JALAPEÑO PEPPERS INGLES 24/7 OZ",
    "WHOLE JALAPEÑO PEPPERS CALIFORNIA 24/7OZ",
    "JALAPEÑO ESCABEC SM 6/2.8 KG",
    "WHOLE JALAP PEPPERS INGLES 6/6LB 1 OZ",
    "WHOLE JALAP PEPPERS CALIFORNIA 6/6LB OZ",
    "JALAPEÑO ENTERO BONAMARK 6/2800G",
    "JALAPENO EN TROZO MLHR 24/215G CAML",
    "JALAPEÑO EN TROZO SM 24/215 G HNMC",
    "JALAPEÑOS PICADOS ELMIGO 215G HNPI",
    "JALAPEÑO DICED 24/7 OZ",
    "JALAPEÑO EN TROZO SM 24/215 G",
    "JALAPEÑO DICED CALIFORNIA 24/7 OZ",
    "JALAPEÑO EN TROZO SM 24/215 G ESVE",
    "JALAPEÑO ESCABEC SM 24/380 G",
    "WHOLE JALAP PEPPERS INGLES 12/11 OZ",
    "WHOLE JALAP PEPPERS CALIFORNIA 12/11 OZ",
    "JALAPEÑO ENTERO OXXO BARA 24/360G",
    "JALAPEÑO ESCAB CLEY 24/380 G",
    "JALAPEÑO ENTERO GOLDEN HILLS 24/380G",
    "WHOLE JALAP PEPPERS USA IMG ACT12/26 OZ",
    "WHOLE JALAP 12/26 90 CJ P/PAL DISP CALIF",
    "Whole Jalap Peper 12/26 90 CJ P/PAL DISP",
    "WHOLE JALAP PEPPERS CALIFORNIA 12/26 OZ",
    "JALAPEÑO ESCABEC SM 12/780 G",
    "JALAPEÑO ESCABEC SM 12/780 G CTWW",
    "JALAPEÑO ESCAB CLEY 12/780 G",
    "JALAPEÑO ENTERO GOLDEN HILLS 12/780G",
    "WHOLE JALAP PEPPERS 12/26 OZ CNHI",
    "WHOLE JALAP PEPER Calif 12/26OZhalf pall",
    "ROD JALAP NACH MLHR 24/215G CAML",
    "RAJA JALAPEÑO VDE SM 40/105 G",
    "RAJAS VERDES JALP GOLDEN HILLS 40/105G",
    "RAJA JALAPEÑO VDE SM 24/215 G",
    "RAJAS VERDES NUESTRO CAMPO 24/210G",
    "RAJA JALAPEÑO VDE BLU 24/210 G",
    "RAJA JALAP VDE CLEY 24/215 G",
    "RAJA JALAPEÑO VDE SM 24/215 G HNMC",
    "RALAS DE JALAPEÑO ELMIGO 215G HNPI",
    "SLICED JAL PEPPERS 24/7 OZ",
    "RAJAS VERDES JALP GOLDEN HILLS 24/215G",
    "SLICED JAL PEPPERS CALIFORNIA 24/7 OZ",
    "SLICED JAL PEPPERS 24/250 ML CNHI",
    "RAJA JALAPEÑO VDE SM 24/380 G",
    "SLICED JAL PEPPERS INGLES12/11 OZ",
    "SLICED JAL PEPPERS CALIFORNIA 12/11 OZ",
    "RAJA JALAP VDE CLEY 24/380 G",
    "RAJAS VERDES OXXO BARA 24/380G",
    "SLICED JAL PEPPERS 12/375 ML CNHI",
    "RAJAS VERDES JALP GOLDEN HILLS 24/380G",
    "SLICED JAL PEPPERS12/11 OZ",
    "SLICED JAL PEPPERS12/26 OZ",
    "SLICED JALAP 12/26OZ CALIFOR 50 CJ P/PAL",
    "RAJA JALAPEÑO SM 12/820 G",
    "Rajas Verdes Nuestro Campo 12/800g",
    "RAJA JALAP VDE CLEY 12/800 G",
    "RAJAS VERDES JALP GOLDEN HILLS 12/800G",
    "SLICED JAL PEPPERS 12/750 ML CN",
    "SLICED JAL PEPPERS12/26 OZ",
    "RAJA JALAPEÑO VDE SM 6/2.8 KG",
    "SLICED JAL PEPPERS CALIFORNIA 6/6LB4 OZ",
    "SLICED JAL PEPPERS 6/6LB4 OZ",
    "SLICED JALAPEÑO PEPPERS 6/3 LT CNEM",
    "SLICED JALAP PEPPERS LUISIANA 12/12 OZ",
    "SLICED JALAP PEPPERS WM 12/12OZ",
    "NACHO JALAP PEPPERS 6/6LB 1 OZ CHBH",
    "NACHO JALAP PEPPERS CALIFORNIA 6/6LB 1OZ",
    "NACHO JALAP PEPPERS 6/6LB 1 OZ TWYS",
    "NACHO JALAP PEPPERS 6/6LB1 OZ OUSA CHSM",
    "RODAJAS JALAP NACHOS 6/2800 G FIKP",
    "NACHO JALAP PEPPERS 6/6LB 1 OZ",
    "RODAJAS DE JALAPEÑO 6/2800 G ESRI",
    "RODAJA JALAP NACH SM 6/2.8 KG ESVE",
    "NACHO JALAP PEPPERS 6/6LB 1 OZ ISEW",
    "NACHO SLICED JALAPEÑO 6/2.8 KG UKGF",
    "SLICED JALAPEÑO PEPPERS 6/3KG EAMH",
    "RODAJAS JAL NACHOS SM 6/2.8 KG",
    "NACHO JALAP PEPPERS 6/6LB 1 OZ AUMD",
    "SLICED JALAPEÑO PEPPERS EL PASADO 6/6LB",
    "RAJA JALAPENO VDE MLHR 24/215G CAML",
    "JALAPEÑO ESCABEC SM 6/1.7 KG",
    "NACHO JALAP PEPPERS 12/11 OZ",
    "NACHO JALAP PEPPERS CALIFORNIA 12/11 OZ",
    "RODAJA JALAP NACHO SM 24/380 G",
    "NACHO SLICED JALAPEÑO SM 12/12OZ",
    "RODAJA JALAP NACH SM 12/800 G CTWW",
    "RODAJAS DE JALAPEÑO 12/800 G ESRI",
    "NACHO JALAP PEPPERS CALIFORNIA 12/26 OZ",
    "RODAJA JALAP NACH SM 12/800 G"
]

const Forecast = () => {
    const [selectedMes, setSelectedMes] = useState(null);
    const handleDropdownSelectMes = (selectedMes) => {
        // console.log(selectedMes)
        setSelectedMes(selectedMes);
    };

    const [selectedProducto, setSelectedProducto] = useState(null);
    const handleDropdownSelectProducto = (selectedProducto) => {
        // console.log(selectedProducto)
        setSelectedProducto(selectedProducto);
    };
    return <div>
        <div className={classes["box"]}>
            <h1 className={classes["title-page"]}>Forecast</h1>
            <div className={classes["box-filters"]} >
                <MyDropdown onSelect={handleDropdownSelectMes} title={"Mes"} arr={meses} text={"Mes seleccionado: "} />
                <MyDropdown onSelect={handleDropdownSelectProducto} title={"Producto"} arr={products} text={"Producto seleccionado: "} />
            </div>

            <div className={classes["box-info"]} >
                <div className={classes["box-data"]} >
                    <Card></Card>
                    <Card></Card>
                </div>
                <div className={classes["box-chart"]}>
                    <ForecastChart meses_props={meses} prods_props={products} mes={selectedMes} producto={selectedProducto} />

                </div>
            </div>
        </div>
    </div>
}

export default Forecast;