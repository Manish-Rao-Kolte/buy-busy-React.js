import React from 'react'
import styles from './productCard.module.css'

function ProductCard({ prod }) {
    const { image, description, price, title } = prod ;

    return (
        <div className={styles.cardContainer}>
            <div className={styles.imgContainer}>
                <img src= {image} alt={title} />
            </div>
            <div className={styles.prodDetail}>
                {description}
            </div>
            <div className={styles.prcbtnContainer}>
                <div className={styles.price}>
                    &#8377; {price}
                </div>
                <div className={styles.btnContainer}>
                    <img src="https://cdn-icons-png.flaticon.com/128/1828/1828899.png" alt="increase-btn" className={styles.decBtn} />
                    <b>1</b>
                    <img src="https://cdn-icons-png.flaticon.com/128/1828/1828919.png" alt="increase-btn" className={styles.incBtn} />
                </div>
            </div>
            <button className={styles.cardBtn}>
                Add To Cart
            </button>
        </div>
    )
}

export default ProductCard