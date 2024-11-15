import { useEffect, useState } from "react";
import Back from "../../components/common/Back";
import { endpoints } from "../../data/endpoints";
import { Fetch, Post, Put } from "../../utils/apiUtils";
import DynamicForm from "../../components/common/DynamicForm";
import SkeletonLoader from "../../components/common/SkeletonLoader";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { productFormFields } from "../../components/forms/productFormFields";
import {
  populateFormData,
  populateFormFields,
  getSelectFormattedData,
} from "../../data/generalFunctions";
import { toast } from "react-toastify";

const ManageProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loading, setLoading] = useState(state ? false : true);
  const [productSubFetched, setProductSubFetched] = useState(false);
  const [productFetched, setProductFetched] = useState(
    state || !id ? true : false
  );
  const [formData, setFormData] = useState<any>(
    state
      ? {
          specifications: state?.specifications,
          ...populateFormData(productFormFields, state),
        }
      : {}
  );
  const [formField, setFormFields] = useState(
    state ? populateFormFields(productFormFields, state) : productFormFields
  );

  useEffect(() => {
    const fetchData = async () => {
      const fetchUrl = `${endpoints["Products"].read}${id}`;
      const resp: any = await Fetch(fetchUrl);
      if (resp?.success) {
        const response = populateFormFields(productFormFields, resp?.data);
        const localFormData = populateFormData(productFormFields, resp?.data);
        setFormFields(response);
        setFormData({
          ...localFormData,
          specifications: resp?.data?.specifications,
        });
        setLoading(false);
        setProductFetched(true);
      }
    };
    if (!state && id) fetchData();
  }, [id, state]);

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
        setProductSubFetched(true);
      }
    };
    if (productFetched) fetchCategory();
    // eslint-disable-next-line
  }, [productFetched]);

  useEffect(() => {
    const fetchSubCategory = async (id: any) => {
      const response: any = await Fetch(
        "subcategories/get-by-category/" + id,
        {},
        5000,
        true,
        false
      );
      if (response?.success && response.data.length > 0) {
        const selectData = getSelectFormattedData(response.data);
        const updatedFormField = formField.map((obj: any) => {
          if (obj.name === "subCategoryId")
            return { ...obj, options: selectData };
          return obj;
        });
        setFormFields(updatedFormField);
      }
    };
    if (formData?.categoryId && productSubFetched)
      fetchSubCategory(formData?.categoryId);
    // eslint-disable-next-line
  }, [formData?.categoryId, productSubFetched]);

  if (loading && id) return <SkeletonLoader />;

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
      if (id) url = `${endpoints["Products"].update}${id}`;
      else url = `${endpoints["Products"].create}`;
      const response: any = id
        ? await Put(url, updatedData)
        : await Post(url, updatedData);
      if (response.success) return navigate(endpoints["Products"].all);
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
          dynamicallyAllowed={true}
          makeApiCall={makeApiCall}
          setFormData={setFormData}
        />
      </div>
    </div>
  );
};

export default ManageProductForm;
