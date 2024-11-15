import Modal from "../common/Modal";
import { MdDeleteForever } from "react-icons/md";

const DeleteModal = ({
  id,
  loading,
  isVisible,
  handleClose,
  handleDelete,
}: {
  id: string;
  loading: boolean;
  isVisible: boolean;
  handleClose: () => void;
  handleDelete: (id: string) => void;
}) => {
  return (
    <Modal
      width="w-1/2"
      isVisible={isVisible}
      onClose={handleClose}
      showCloseButton={false}
    >
      <div className="flex flex-col justify-center items-center">
        <MdDeleteForever className="text-7xl text-red-600" />
        <p className="text-3xl font-bold text-red-900 mb-5">
          Do you really want to delete?
        </p>
        <div className="mb-4">
          <button
            disabled={loading}
            onClick={() => handleDelete(id)}
            className="px-4 py-2 rounded-lg text-xl text-white bg-red-500 hover:bg-red-400"
          >
            Delete
          </button>
          <button
            disabled={loading}
            onClick={handleClose}
            className="ml-4 px-4 py-2 rounded-lg text-xl text-white bg-gray-500 hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
