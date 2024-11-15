import { useEffect, useState } from "react";
import Modal from "../common/Modal";
import { toast } from "react-toastify";
import DynamicForm from "../common/DynamicForm";
import { endpoints } from "../../data/endpoints";
import { Fetch, Post, Put } from "../../utils/apiUtils";
import { subcategoryFormFields } from "../forms/productFormFields";
import {
  getSelectFormattedData,
  populateFormData,
  populateFormFields,
} from "../../data/generalFunctions";

const SubCategoryModal = ({
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
  const [formField, setFormFields] = useState(
    data
      ? populateFormFields(subcategoryFormFields, data)
      : subcategoryFormFields
  );
  const [formData, setFormData] = useState<any>(
    data ? populateFormData(subcategoryFormFields, data) : {}
  );

  useEffect(() => {
    const fetchCategory = async () => {
      const response: any = await Fetch(
        "categories/all",
        {},
        5000,
        true,
        false
      );
      if (response?.success && response.data.result?.length > 0) {
        const selectData = getSelectFormattedData(response.data?.result);
        const updatedFormField = formField.map((obj: any) => {
          if (obj.name === "categoryId") return { ...obj, options: selectData };
          return obj;
        });
        setFormFields(updatedFormField);
      }
    };
    if (isVisible) fetchCategory();
    // eslint-disable-next-line
  }, [isVisible]);

  const makeApiCall = async (updatedData: any) => {
    try {
      let url = "";
      if (data?._id) url = `${endpoints["SCategories"].update}${data?._id}`;
      else url = `${endpoints["SCategories"].create}`;
      const response: any = data?._id
        ? await Put(url, updatedData)
        : await Post(url, updatedData);
      if (response.success) {
        const fetchUrl = `${endpoints["SCategories"].fetchAll}`;
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

export default SubCategoryModal;
