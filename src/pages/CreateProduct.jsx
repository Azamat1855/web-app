import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    price: '',
    image: '',
    quantity: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newProduct = {
      ...formData,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity, 10),
    };

    try {
      const response = await axios.post('http://localhost:5000/api/products/create', newProduct);
      toast.success('Product created successfully!');
      setFormData({
        productName: '',
        description: '',
        price: '',
        image: '',
        quantity: '',
      });
    } catch (error) {
      toast.error('Error creating the product.');
    }
  };

  return (
    <div className="p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Create New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="productName" className="block mb-1">Product Name</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="price" className="block mb-1">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="input input-bordered w-full"
            step="0.01"
            required
          />
        </div>
        <div>
          <label htmlFor="image" className="block mb-1">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="quantity" className="block mb-1">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-full sm:w-auto">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;
