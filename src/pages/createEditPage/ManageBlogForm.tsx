import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  populateFormData,
  populateFormFields,
} from "../../data/generalFunctions";
import { toast } from "react-toastify";
import Back from "../../components/common/Back";
import { endpoints } from "../../data/endpoints";
import { Post, Put } from "../../utils/apiUtils";
import DynamicForm from "../../components/common/DynamicForm";
import { blogFormFields } from "../../components/forms/productFormFields";
import RichTextEditor from "../../components/common/RichTextEditor";

const ManageBlogForm = () => {
  const { blogId: id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loading, setLoading] = useState(state ? false : true);
  const [formData, setFormData] = useState<any>(
    state ? populateFormData(blogFormFields, state) : {}
  );
  const [formField, setFormFields] = useState(
    state ? populateFormFields(blogFormFields, state) : blogFormFields
  );

  const modifyFormData = (formData: FormData, data: any) => {
    if (formData.has("specifications") && data?.specifications) {
      formData.delete("specifications");
      formData.append("specifications", JSON.stringify(data?.specifications));
    }
    if (formData.has("tags") && data?.tags) {
      formData.delete("tags");
      formData.append("tags", data?.tags);
    }
    return formData;
  };

  const makeApiCall = async (data: any) => {
    try {
      let url = "";
      const updatedData = modifyFormData(data, formData);
      if (id) url = `${endpoints["Blogs"].update}${id}`;
      else url = `${endpoints["Blogs"].create}`;
      const response: any = id
        ? await Put(url, updatedData)
        : await Post(url, updatedData);
      if (response.success) return navigate(endpoints["Blogs"].all);
      else return toast.error("Something went wrong!");
    } catch (error) {
      return toast.error("Something went wrong!");
    }
  };

  return (
    <div className="bg-gray-100">
      <Back link="/products" />
      <div className="p-4 bg-white shadow-lg rounded-2xl m-4 transition-all duration-300">
        <DynamicForm
          returnAs="formData"
          fields={formField}
          formData={formData}
          makeApiCall={makeApiCall}
          setFormData={setFormData}
        />
        <RichTextEditor data={""} setState={setFormData} />
      </div>
    </div>
  );
};

export default ManageBlogForm;
