import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getCategories, createProduct } from "./helper/adminapicall";
export default function AddProduct() {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    category: "",
    categories: [],
    loading: false,
    error: "",
    createProduct: "",
    getARedirect: false,
    formData: "",
  });
  const {
    name,
    description,
    price,
    stock,
    photo,
    categories,
    category,
    loading,
    error,
    createdProduct,
    formData,
    getARedirect,
  } = values;
  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.eror });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
        console.log("CATE:", categories);
      }
    });
  };
  useEffect(() => {
    preload();
  }, []);
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description,
          price: "",
          photo: "",
          stock: "",
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  };
  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };
  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h4>{createdProduct} created successfully</h4>
    </div>
  );

  const errorMessage = () => {
    if (error) {
      return (
        <div
          className="alert alert-success mt-3"
          style={{ display: createdProduct ? "" : "none" }}
        >
          <h4>{createdProduct} created successfully</h4>
        </div>
      );
    }
  };
  const goBack = () => (
    <div className="mt-1">
      <Link className="btn btn-sm btn-dark mb-1" to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );
  const createProductForm = () => (
    <form>
      <span className="mt-2">Post photo</span>
      <div className="form-group mt-2">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group mt-2">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group mt-2">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group mt-2">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group mt-2">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group mt-2">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Stock"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success my-2"
      >
        Create Product
      </button>
    </form>
  );
  return (
    <Base
      title="Add a Product here!"
      description="Welcome to product creation section"
      className="container bg-info py-2 px-4"
    >
      {goBack()}
      <div className="row bg-dark text-white rounded ">
        {successMessage()}
        {errorMessage()}
        {createProductForm()}
      </div>
    </Base>
  );
}
