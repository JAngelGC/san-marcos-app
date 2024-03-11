import Dropdown from 'react-bootstrap/Dropdown';
import classes from './Dropdown.module.css'
import { useState } from 'react';

const MyDropdown = (props) => {
    const [item, setItem] = useState("")

    const handleSelect = (eventKey, event) => {
        props.onSelect(eventKey);
        setItem(eventKey)
    };

    return <div className={classes["box-dropdown"]} >
        <Dropdown onSelect={handleSelect} className={`bg-main-color ${classes["my-dropdown"]}`} data-bs-theme="dark">
            <Dropdown.Toggle variant="blue" id="dropdown-basic">
                {props.title}
            </Dropdown.Toggle>

            <Dropdown.Menu>

                {props.arr.map((item) => {
                    return <Dropdown.Item eventKey={item}>{item}</Dropdown.Item>
                })}
            </Dropdown.Menu>
        </Dropdown>
        <div className={classes["box-text"]} >
            <p>{props.text}  </p>
            <p className={classes["item"]} >{item}</p>
        </div>
    </div>
}

export default MyDropdown;