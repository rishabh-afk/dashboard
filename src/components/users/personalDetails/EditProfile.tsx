import { useEffect, useState } from "react";
import DynamicForm from "../../common/DynamicForm";
import { formFields } from "../../forms/formFields";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  populateFormData,
  populateFormFields,
} from "../../../data/generalFunctions";
import { toast } from "react-toastify";
import { endpoints } from "../../../data/endpoints";
import SkeletonLoader from "../../common/SkeletonLoader";
import { Fetch, Post, Put } from "../../../utils/apiUtils";

const EditProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loading, setLoading] = useState(state ? false : true);
  const [formData, setFormData] = useState<any>(
    state ? populateFormData(formFields, state) : {}
  );
  const [formField, setFormFields] = useState(
    state ? populateFormFields(formFields, state) : formFields
  );

  useEffect(() => {
    const fetchData = async () => {
      const fetchUrl = `${endpoints["Users"].read}${id}`;
      const resp: any = await Fetch(fetchUrl);
      if (resp?.success) {
        const response = populateFormFields(formFields, resp?.data);
        const localFormData = populateFormData(formFields, resp?.data);
        setFormFields(response);
        setFormData({ ...localFormData, additionalFeatures: {} });
        setLoading(false);
      }
    };
    if (!state && id) fetchData();
  }, [id, state]);

  if (loading && id) return <SkeletonLoader />;

  const makeApiCall = async (data: any) => {
    let url = "";
    if (id) url = `${endpoints["Users"].update}${id}`;
    else url = `${endpoints["Users"].create}`;
    const response: any = id ? await Put(url, data) : await Post(url, data);
    if (response.success) return navigate(endpoints["Users"].all);
    else return toast.error("Something went wrong!");
  };

  return (
    <DynamicForm
      fields={formField}
      returnAs="formData"
      formData={formData}
      makeApiCall={makeApiCall}
      setFormData={setFormData}
    />
  );
};

export default EditProfile;
