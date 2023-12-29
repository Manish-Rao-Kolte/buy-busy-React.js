import React, { useEffect } from "react";
import { useProductValue } from "../../../context/productContext";
import ProductCard from "../../../Components/product-card/ProductCard";
import styles from "./product.module.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Product = () => {
  const {
    data,
    handleSearchFilter,
    filteredData,
    searchTerm,
    setSearchTerm,
    loading,
    priceFilter,
    setPriceFilter,
  } = useProductValue();

  const checkbox = true;

  return (
    <div className={styles.productPage}>
      {loading && (
        <Backdrop
          sx={{ color: "red", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <div className={styles.productsContainer}>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search Item By Name"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleSearchFilter();
            }}
          />
        </div>
        <div className={styles.prodList}>
          {filteredData.length === 0 && searchTerm === ""
            ? data.map((prod, i) => {
                return <ProductCard key={i} prod={prod} />;
              })
            : filteredData.map((prod, i) => {
                return <ProductCard key={i} prod={prod} />;
              })}
        </div>
      </div>
      <div className={styles.filterContainer}>
        <h3> Filter </h3>
        <p> Price: &#8377; {priceFilter}</p>
        <input
          type="range"
          onChange={(e) => setPriceFilter(e.target.value * 10)}
        />
        <h3> Category </h3>
        <div className={styles.inputContainer}>
          <div>
            <input
              type="checkbox"
              value="men's clothing"
              onChange={(e) => handleSearchFilter(e, checkbox)}
            />
            <span>Men's clothing</span>
          </div>
          <div>
            <input
              type="checkbox"
              value="electronics"
              onChange={(e) => handleSearchFilter(e, checkbox)}
            />
            <span>Electronics</span>
          </div>
          <div>
            <input
              type="checkbox"
              value="jewelery"
              onChange={(e) => handleSearchFilter(e, checkbox)}
            />
            <span>Jewelery</span>
          </div>
          <div>
            <input
              type="checkbox"
              value="women's clothing"
              onChange={(e) => handleSearchFilter(e, checkbox)}
            />
            <span>Women's clothing</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
