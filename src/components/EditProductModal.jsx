import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const EditProductModal = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    productName: '',
    price: '',
    description: '',
    quantity: ''
  });

  const dialogRef = useRef(null);

  useEffect(() => {
    if (product) {
      setFormData({
        productName: product.productName,
        price: product.price,
        description: product.description,
        quantity: product.quantity
      });

      // Show the dialog
      dialogRef.current.showModal();
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/products/edit/${product.id}`, formData);
      onSave();
      dialogRef.current.close(); // Close the dialog after saving
    } catch (error) {
      console.error('Error updating the product:', error);
    }
  };

  return (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit Product</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Product Name</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">Save Changes</button>
            <button type="button" className="btn" onClick={() => dialogRef.current.close()}>Cancel</button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default EditProductModal;
