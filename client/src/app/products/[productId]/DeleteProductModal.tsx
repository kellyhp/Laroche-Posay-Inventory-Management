import Modal from "@/app/(components)/Modal";

type DeleteProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  productName: string;
};

const DeleteProductModal = ({
  isOpen,
  onClose,
  onDelete,
  productName,
}: DeleteProductModalProps) => {
  const handleConfirm = () => {
    onDelete();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete the product &quot;{productName}&quot;?</p>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteProductModal;
