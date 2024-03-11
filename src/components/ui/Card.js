import classes from "./Card.module.css"

const Card = () => {
    return <div className={classes["card"]} >
        <p className={classes["number"]} >12,000</p>
        <p className={classes["info"]} >Jalapenos chicos</p>

    </div>
}

export default Card;