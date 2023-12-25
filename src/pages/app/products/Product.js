import React, { useEffect } from 'react'
import { useProductValue } from '../../../context/productContext';
import ProductCard from '../../../Components/product-card/ProductCard';
import styles from './product.module.css'
import Loader from '../../../Components/loader/Loader';

const Product = () => {

  const { data, handleSearchBar, filteredData, searchTerm, setSearchTerm } = useProductValue();

  return (
    <div className={styles.productsContainer}>
      <div className={styles.searchBar}>
        <input type='text' placeholder='Search Item By Name' onChange={(e) => { setSearchTerm(e.target.value); handleSearchBar() }} />
      </div>
      <div className={styles.prodList}>
        {filteredData.length === 0 || searchTerm === ""?
          data.map((prod, i) => {
            return (
              <ProductCard key={i} prod={prod} />
            )
          }) :
          filteredData.map((prod, i) => {
            return (
              <ProductCard key={i} prod={prod} />
            )
          })
        }
      </div>
    </div>
  )
}

export default Product;