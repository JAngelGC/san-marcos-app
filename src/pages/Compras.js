import { useState } from "react";
import ComprasChart from "../components/chart/ComprasChart"
import Card from "../components/ui/Card";
import MyDropdown from "../components/ui/MyDropdown";
import classes from './Page.module.css'

const meses = [
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
    "Enero",
    "Febrero"
]

const tamanos = [
    "chico",
    "mediano",
    "grande"
]

const Compras = () => {
    const [selectedMes, setSelectedMes] = useState(null);
    const handleDropdownSelectMes = (selectedMes) => {
        console.log(selectedMes)
        setSelectedMes(selectedMes);
    };

    const [selectedTanmano, setSelectedTamano] = useState(null);
    const handleDropdownSelectProducto = (selectedTanmano) => {
        console.log(selectedTanmano)
        setSelectedTamano(selectedTanmano);
    };

    return <div>
        <div className={classes["box"]}>
            <h1 className={classes["title-page"]}>Compras</h1>
            <div className={classes["box-filters"]} >
                <MyDropdown onSelect={handleDropdownSelectMes} title={"Mes"} arr={meses} text={"Mes seleccionado: "} />
                <MyDropdown onSelect={handleDropdownSelectProducto} title={"Tamaño"} arr={tamanos} text={"Tamaño seleccionado: "} />
            </div>

            <div className={classes["box-info"]} >
                <div className={classes["box-data"]} >
                    <Card></Card>
                    <Card></Card>
                </div>
                <div className={classes["box-chart"]}>
                    <ComprasChart meses_props={meses} tamanos_props={tamanos} mes={selectedMes} tamano={selectedTanmano} />

                </div>
            </div>
        </div>
    </div>
}

export default Compras;