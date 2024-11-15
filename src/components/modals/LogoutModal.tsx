import Modal from "../common/Modal";
import { IoLogOut } from "react-icons/io5";

const LogoutModal = ({
  isVisible,
  handleClose,
  handleLogout,
}: {
  isVisible: boolean;
  handleClose: () => void;
  handleLogout: () => void;
}) => {
  return (
    <Modal
      width="w-1/2"
      isVisible={isVisible}
      onClose={handleClose}
      showCloseButton={false}
    >
      <div className="flex flex-col justify-center items-center">
        <IoLogOut className="text-7xl text-red-600" />
        <p className="text-3xl font-bold text-red-900 mb-5">
          Do you really want to Logout?
        </p>
        <div className="mb-4">
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg text-xl text-white bg-red-500 hover:bg-red-400"
          >
            Logout
          </button>
          <button
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

export default LogoutModal;
