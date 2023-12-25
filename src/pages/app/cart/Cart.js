import React from 'react'
import { useProductValue } from '../../../context/productContext'
import ProductCard from '../../../Components/product-card/ProductCard';
import styles from './cart.module.css'


const Cart = () => {
  const { cart } = useProductValue();

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartList}>
        {cart.length !== 0 && cart.map((item) => {
          return (
            <ProductCard prod={item.prod} qty={item.qty} incart= {true}/>
          )
        })}
      </div>
    </div>
  )
}

export default Cart