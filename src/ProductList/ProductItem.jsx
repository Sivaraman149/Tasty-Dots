import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

const ProductItem = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetching the JSON data using Axios
    axios.get(`${process.env.PUBLIC_URL}/products.json`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => console.error('Error fetching the products:', error));
  }, []);

  const handleAddClick = () => {
    Swal.fire({
      icon: 'success',
      title: 'Added to Cart',
      text: "Product has been added to your cart!",
      showConfirmButton: true,
      timer: 3000,
    });
  };

  return (
    <section className="my-lg-14 my-8">
      <div className="container">
        <div className="row">
          <div className="col-12 mb-6">
            <div className="section-head text-center mt-8">
              <h3 className='h3style' data-title="Popular Products">Popular Products</h3>
              <div className="wt-separator bg-primarys"></div>
              <div className="wt-separator2 bg-primarys"></div>
            </div>
          </div>
        </div>
        <div className="row g-4 row-cols-lg-5 row-cols-2 row-cols-md-3">
          {products.map(product => (
            <div key={product.id} className="col fade-zoom">
              <div className="card card-product">
                <div className="card-body">
                  <div className="text-center position-relative">
                    {product.sale && (
                      <div className="position-absolute top-0 start-0">
                        <span className="badge bg-danger">Sale</span>
                      </div>
                    )}
                    <Link to="#!">
                      <img
                        src={`${process.env.PUBLIC_URL}/${product.image}`}
                        alt={product.name}
                        className="mb-3 img-fluid"
                      />
                    </Link>
                    <div className="card-product-action">
                      <Link to="#!" className="btn-action"><i className="bi bi-eye" /></Link>
                      <Link to="#!" className="btn-action"><i className="bi bi-heart" /></Link>
                      <Link to="#!" className="btn-action"><i className="bi bi-arrow-left-right" /></Link>
                    </div>
                  </div>
                  <div className="text-small mb-1">
                    <Link to="#!" className="text-decoration-none text-muted">
                      <small>{product.brand}</small>
                    </Link>
                  </div>
                  <h2 className="fs-6">
                    <Link to="#!" className="text-inherit text-decoration-none">
                      {product.name}
                    </Link>
                  </h2>
                  <div>
                    <small className="text-warning">
                      {Array.from({ length: Math.floor(product.rating) }).map((_, index) => (
                        <i key={index} className="bi bi-star-fill" />
                      ))}
                      {product.rating % 1 !== 0 && <i className="bi bi-star-half" />}
                    </small>
                    <span className="text-muted small">{product.rating} ({product.reviews})</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <div>
                      <span className="text-dark">{product.price}</span>
                      <span className="text-decoration-line-through text-muted">
                        {product.originalPrice}
                      </span>
                    </div>
                    <div>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={handleAddClick}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductItem;
