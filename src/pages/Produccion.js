import { useState } from "react";
import ProduccionChart from "../components/chart/ProduccionChart"
import Card from "../components/ui/Card";
import MyDropdown from "../components/ui/MyDropdown";
import classes from './Page.module.css'

const meses = [
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
    "enero",
]

const products = [
    "Bote jalapeños 215", "Bote jalapeños 380", "Bote jalapeños 2800", "Bote Jalapeño en trozo BS 215",
    "Bote jalapeños en trozos 215", "Bote jalapeños 780", "Bote rajas verdes 105",
    "Bote rajas verdes 215", "Bote rajas verdes 800", "Bote rajas verdes 2800",
    "Bote rajas verdes 380", "Frasco rodajas 12 oz lit", "Frasco rodajas 12 oz TD"
]

const Produccion = () => {
    const [selectedMes, setSelectedMes] = useState(null);
    const handleDropdownSelectMes = (selectedMes) => {
        console.log(selectedMes)
        setSelectedMes(selectedMes);
    };

    const [selectedProducto, setSelectedProducto] = useState(null);
    const handleDropdownSelectProducto = (selectedProducto) => {
        console.log(selectedProducto)
        setSelectedProducto(selectedProducto);
    };

    return <div>
        <div className={classes["box"]}>
            <h1 className={classes["title-page"]}>Producción</h1>
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
                    <ProduccionChart meses_props={meses} prods_props={products} mes={selectedMes} producto={selectedProducto} />
                </div>
            </div>
        </div>
    </div>
}

export default Produccion