import { useState } from 'react';
import Modal from '@/app/(components)/Modal';

export interface ProductFormData {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
}

type EditProductModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onEdit: (productData: ProductFormData) => void;
    product: Product;
  };
  
  const EditProductIdModal = ({
    isOpen,
    onClose,
    onEdit,
    product,
  }: EditProductModalProps) => {
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [stockQuantity, setStockQuantity] = useState(product.stockQuantity);
    const [rating, setRating] = useState(product.rating ?? 0);
  
    const handleConfirm = () => {
      onEdit({ name, price, stockQuantity, rating });
    };
  
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border p-2 rounded dark:text-white"
              />
            </div>
            <div>
              <label className="block mb-2">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full border p-2 rounded dark:text-white"
              />
            </div>
            <div>
              <label className="block mb-2">Stock Quantity</label>
              <input
                type="number"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(Number(e.target.value))}
                className="w-full border p-2 rounded dark:text-white"
              />
            </div>
            <div>
              <label className="block mb-2">Rating</label>
              <input
                type="number"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full border p-2 rounded dark:text-white"
                min={0}
                max={5}
              />
            </div>
          </div>
  
          <div className="flex justify-end space-x-4 mt-6">
            <button
              className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    );
  };
  
  export default EditProductIdModal;  