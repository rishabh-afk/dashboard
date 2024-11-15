import { useEffect, useState } from "react";
import Back from "../../components/common/Back";
import { endpoints } from "../../data/endpoints";
import { Fetch, Post, Put } from "../../utils/apiUtils";
import DynamicForm from "../../components/common/DynamicForm";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { inventoryFormFields } from "../../components/forms/productFormFields";
import {
  populateFormData,
  populateFormFields,
} from "../../data/generalFunctions";
import { toast } from "react-toastify";

const UpdateInventory = () => {
  const formType = "Inventory";
  const navigate = useNavigate();
  const { state, pathname } = useLocation();
  const { inventoryId, id } = useParams();
  const [formData, setFormData] = useState<any>(
    state
      ? {
          specifications: state?.specifications,
          width: state?.dimensions?.width ?? 0,
          length: state?.dimensions?.length ?? 0,
          height: state?.dimensions?.height ?? 0,
          ...populateFormData(inventoryFormFields, state),
        }
      : {}
  );
  const [formField, setFormFields] = useState(
    state ? populateFormFields(inventoryFormFields, state) : inventoryFormFields
  );
  const [data, setData] = useState(state ?? null);

  useEffect(() => {
    const fetchInventoryById = async () => {
      const fetchUrl = `${endpoints[formType].read}${inventoryId}`;
      const resp: any = await Fetch(fetchUrl);
      if (resp?.success) {
        setData(resp?.data);
        const response = populateFormFields(inventoryFormFields, resp?.data);
        const localFormData = populateFormData(inventoryFormFields, resp?.data);
        setFormFields(response);
        setFormData({
          ...localFormData,
          specifications: resp?.data?.specifications,
        });
      }
    };
    if (!state && inventoryId) fetchInventoryById();
    // eslint-disable-next-line
  }, []);

  const makeApiCall = async (formData: any) => {
    const updatedData = {
      ...formData,
      productId: data?.product_id ?? id,
      dimensions: {
        width: formData?.width ?? 0,
        length: formData?.length ?? 0,
        height: formData?.height ?? 0,
      },
    };
    delete updatedData?.width;
    delete updatedData?.length;
    delete updatedData?.height;
    delete updatedData?.specifications;
    try {
      let url = "";
      if (inventoryId) url = `${endpoints["Inventory"].update}${inventoryId}`;
      else url = `${endpoints["Inventory"].create}`;
      const response: any = inventoryId
        ? await Put(url, updatedData)
        : await Post(url, updatedData);
      if (response.success && inventoryId)
        return navigate("/manage-inventory/" + updatedData?.productId);
      else if (response.success) {
        navigate(0);
        navigate(pathname, { replace: true });
      } else return toast.error("Something went wrong!");
    } catch (error) {
      return toast.error("Something went wrong!");
    }
  };

  return (
    <>
      {inventoryId && <Back />}
      {inventoryId && (
        <h2 className="text-3xl p-5 font-semibold">
          Product Name : {data?.productName}
        </h2>
      )}
      <div className="p-5 pt-0">
        <DynamicForm
          returnAs="object"
          fields={formField}
          formData={formData}
          makeApiCall={makeApiCall}
          setFormData={setFormData}
        />
      </div>
    </>
  );
};

export default UpdateInventory;
