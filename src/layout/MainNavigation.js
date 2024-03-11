import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { Link } from 'react-router-dom';
import classes from './MainNavigation.module.css'


const MainNavigation = () => {
    return <div className={classes["nav-box"]}>
        <div className={classes["box-logo"]}>
            <img className={classes["img-logo"]} src='./san_marcos.png' ></img>
        </div>

        <Navbar className={`bg-main-color justify-content-end ${classes["nav"]} `} data-bs-theme="dark">
            <Container>
                <div></div>
                <Nav className={`ml-auto`}>
                    <Nav.Link as={Link} to="/produccion" > <p className={classes["nav-link"]}>Producción</p> </Nav.Link>
                    <Nav.Link as={Link} to="/compras"> <p className={classes["nav-link"]}>Compras</p> </Nav.Link>
                    <Nav.Link as={Link} to="/forecast"> <p className={classes["nav-link"]}>Forecast</ p> </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    </div>
}

export default MainNavigation;