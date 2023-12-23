import React, { useEffect } from 'react'
import { useProductValue } from '../../../context/productContext';
import ProductCard from '../../../Components/product-card/ProductCard';
import styles from './product.module.css'
import Loader from '../../../Components/loader/Loader';

const Product = () => {

  const {data, setData} = useProductValue();

  return (
    <div className={styles.productsContainer}>
      <div className={styles.searchBar}>
        <input type='text' placeholder='Search item by name' />
      </div>
      <div className={styles.prodList}>
        {data.map((prod, i) => {
          return(
            <ProductCard key={i} prod= {prod} />
          )
        })}
      </div>
    </div>
  )
}

export default Product;