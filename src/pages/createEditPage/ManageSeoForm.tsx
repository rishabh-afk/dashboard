import { useState } from "react";
import { toast } from "react-toastify";
import { endpoints } from "../../data/endpoints";
import { Post, Put } from "../../utils/apiUtils";
import Back from "../../components/common/Back";
import DynamicForm from "../../components/common/DynamicForm";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  populateFormData,
  populateFormFields,
} from "../../data/generalFunctions";
import { SEOFormFields } from "../../components/forms/productFormFields";

const ManageSeoForm = () => {
  const { seoId: id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [formData, setFormData] = useState<any>(
    state ? populateFormData(SEOFormFields, state) : {}
  );
  const formField = state
    ? populateFormFields(SEOFormFields, state)
    : SEOFormFields;

  const makeApiCall = async (updatedData: any) => {
    try {
      let url = "";
      if (id) url = `${endpoints["SEO"].update}${id}`;
      else url = `${endpoints["SEO"].create}`;
      const response: any = id
        ? await Put(url, updatedData)
        : await Post(url, updatedData);
      if (response.success) return navigate(endpoints["SEO"].all);
      else return toast.error("Something went wrong!");
    } catch (error) {
      return toast.error("Something went wrong!");
    }
  };

  return (
    <div className="bg-gray-100">
      <Back link="/seo" />
      <div className="p-4 bg-white shadow-lg rounded-2xl m-4 transition-all duration-300">
        <DynamicForm
          returnAs="object"
          fields={formField}
          formData={formData}
          makeApiCall={makeApiCall}
          setFormData={setFormData}
        />
      </div>
    </div>
  );
};

export default ManageSeoForm;
