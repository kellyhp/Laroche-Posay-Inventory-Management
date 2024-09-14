"use client";
import { useState } from 'react';
import { useGetProductByIdQuery, useUpdateProductMutation, useDeleteProductMutation } from '@/state/api';
import EditProductIdModal from './EditProductIdModal';
import DeleteProductModal from '../DeleteProductModal';
import Rating from '@/app/(components)/Rating';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const ProductPage = () => {
  const pathname = usePathname();
  const productId = pathname.split('/').pop();

  const { data: product, isLoading, isError } = useGetProductByIdQuery(productId);
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const productWithDefaults = {
    ...product,
    rating: product?.rating ?? 0
  };

  const handleEditConfirm = async (editData: { name: string; price: number; stockQuantity: number; rating: number }) => {
    try {
      const updatePayload = {
        productId: product?.productId || '', // Ensure productId is provided
        productData: {
          name: editData.name,
          price: editData.price,
          stockQuantity: editData.stockQuantity,
          rating: editData.rating
        }
      };
  
      await updateProduct(updatePayload);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };  

  const handleDeleteConfirm = async () => {
    try {
      await deleteProduct(product?.productId || '');
      window.location.href = '/products';
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !product) return <div>Error fetching product details</div>;

  return (
    <div className="container mx-auto py-10 px-4">
      {/* PRODUCT DETAILS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Placeholder image */}
        <div className="w-full h-64 bg-gray-200 flex justify-center items-center">
          <Image
            src="/placeholder.png"
            alt="Product image"
            width={200}
            height={200}
            className="object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-xl font-semibold text-gray-700">${product.price.toFixed(2)}</p>

          {/* Stock */}
          {product.stockQuantity && (
            <div className="flex items-center">
              <p className='text-lg'> <span className='font-bold'>Stock Quantity:</span> {product.stockQuantity} </p>
            </div>
          )}

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center">
              <Rating rating={product.rating} />
              <span className="ml-2 text-gray-600 text-md">({product.rating})</span>
            </div>
          )}

          {/* Edit/Delete Buttons */}
          <div className="space-x-4 mt-6">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsEditModalOpen(true)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      <EditProductIdModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onEdit={handleEditConfirm}
        product={productWithDefaults}
      />

      {/* DELETE MODAL */}
      <DeleteProductModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeleteConfirm}
        productName={product.name}
      />
    </div>
  );
};

export default ProductPage;
