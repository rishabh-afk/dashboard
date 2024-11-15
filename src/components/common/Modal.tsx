import ReactDOM from "react-dom";
import { RxCross1 } from "react-icons/rx";

interface ModalProps {
  width: string;
  isVisible: boolean;
  onClose: () => void;
  showCloseButton?: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  onClose,
  children,
  isVisible,
  width = "w-4/5",
  showCloseButton = true,
}) => {
  if (!isVisible) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center overflow-hidden justify-center z-50">
      <div className="fixed inset-0 bg-white backdrop-blur-lg bg-opacity-10"></div>
      <div
        className={`bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg z-10 rounded-xl relative ${width}`}
      >
        <div className="bg-slate-100 overflow-scroll no-scrollbar max-h-[90vh] rounded-xl">
          <p className="w-full flex justify-end items-center p-4 pb-0">
            {showCloseButton && (
              <RxCross1
                size={24}
                className="cursor-pointer text-primary"
                onClick={onClose}
              />
            )}
          </p>
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default Modal;
