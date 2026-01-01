import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import './Shop.css';

const ProductList = () => {
  return (
    <div className="product-list-container">
      <h2 className="products-title">Our Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
