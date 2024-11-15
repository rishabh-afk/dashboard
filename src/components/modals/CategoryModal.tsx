import { useState } from "react";
import Modal from "../common/Modal";
import { toast } from "react-toastify";
import DynamicForm from "../common/DynamicForm";
import { endpoints } from "../../data/endpoints";
import { Fetch, Post, Put } from "../../utils/apiUtils";
import { categoryFormFields } from "../forms/productFormFields";
import {
  populateFormData,
  populateFormFields,
} from "../../data/generalFunctions";

const CategoryModal = ({
  data,
  isVisible,
  setPaginate,
  handleClose,
  setFilteredData,
}: {
  data: any;
  setPaginate?: any;
  isVisible: boolean;
  setFilteredData?: any;
  handleClose: () => void;
}) => {
  const formField = data
    ? populateFormFields(categoryFormFields, data)
    : categoryFormFields;
  const [formData, setFormData] = useState<any>(
    data ? populateFormData(categoryFormFields, data) : {}
  );

  const makeApiCall = async (updatedData: any) => {
    try {
      let url = "";
      if (data?._id) url = `${endpoints["Categories"].update}${data?._id}`;
      else url = `${endpoints["Categories"].create}`;
      const response: any = data?._id
        ? await Put(url, updatedData)
        : await Post(url, updatedData);
      if (response.success) {
        const fetchUrl = `${endpoints["Categories"].fetchAll}`;
        const resp: any = await Fetch(fetchUrl);
        if (resp?.success) setFilteredData(resp?.data?.result);
        if (resp?.success && resp?.data?.pagination)
          setPaginate(resp?.data?.pagination);
        return handleClose();
      } else return toast.error("Something went wrong!");
    } catch (error) {
      return toast.error("Something went wrong!");
    }
  };

  return (
    <Modal width="w-2/3" isVisible={isVisible} onClose={handleClose}>
      <div className="flex flex-col justify-center items-center">
        {isVisible && (
          <DynamicForm
            fields={formField}
            formData={formData}
            setFormData={setFormData}
            makeApiCall={makeApiCall}
          />
        )}
      </div>
    </Modal>
  );
};

export default CategoryModal;
