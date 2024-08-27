import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditProductModal from '../components/EditProductModal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar'; // Import Navbar
import Sidebar from '../components/Sidebar'; // Import Sidebar

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null); // State for product to be deleted

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/get/all');
        console.log('Data from API:', response.data);
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching the products:', error);
        toast.error('Error fetching the products.');
      }
    };

    fetchProducts();
  }, []);

  const handleSave = async () => {
    // Re-fetch the products after a product is edited
    const response = await axios.get('http://localhost:5000/api/products/get/all');
    setProducts(response.data.products);
    setSelectedProduct(null);
    toast.success('Product updated successfully!');
  };

  const handleDelete = async () => {
    if (productToDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/products/delete/${productToDelete.id}`);
        setProducts(products.filter((product) => product.id !== productToDelete.id));
        toast.success('Product deleted successfully!');
        setProductToDelete(null);
      } catch (error) {
        console.error('Error deleting the product:', error);
        toast.error('Error deleting the product.');
      } finally {
        document.getElementById('delete_modal').close();
      }
    }
  };

  const confirmDelete = (product) => {
    setProductToDelete(product);
    document.getElementById('delete_modal').showModal();
  };

  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <ToastContainer />
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Product List</h1>
          <div className="overflow-x-auto">
            <table className="table-auto min-w-max w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">ID</th>
                  <th className="p-2">Product Name</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Description</th>
                  <th className="p-2">Quantity</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product.id}>
                      <td className="p-2">{product.id}</td>
                      <td className="p-2">{product.productName}</td>
                      <td className="p-2">{product.price}</td>
                      <td className="p-2">{product.description}</td>
                      <td className="p-2">{product.quantity}</td>
                      <td className="p-2">
                        <button
                          className="btn btn-primary mr-2"
                          onClick={() => setSelectedProduct(product)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => confirmDelete(product)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center p-4">
                      No products available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {selectedProduct && (
            <EditProductModal
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
              onSave={handleSave} // Pass handleSave to EditProductModal
            />
          )}
        </div>

        {/* Delete Confirmation Modal */}
        <dialog id="delete_modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Deletion</h3>
            <p className="py-4">Are you sure you want to delete this product?</p>
            <div className="modal-action">
              <button className="btn btn-danger" onClick={handleDelete}>Yes, Delete</button>
              <button className="btn" onClick={() => document.getElementById('delete_modal').close()}>Cancel</button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default Home;
