import { useEffect, useState } from "react";
import Back from "../../components/common/Back";
import { endpoints } from "../../data/endpoints";
import { Fetch, Post, Put } from "../../utils/apiUtils";
import DynamicForm from "../../components/common/DynamicForm";
import SkeletonLoader from "../../components/common/SkeletonLoader";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { couponFormFields } from "../../components/forms/productFormFields";
import {
  populateFormData,
  populateFormFields,
  getSelectFormattedData,
} from "../../data/generalFunctions";
import { toast } from "react-toastify";

const ManageCouponForm = () => {
  const { couponId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loading, setLoading] = useState(state ? false : true);
  const [productFetched, setProductFetched] = useState(
    state || !couponId ? true : false
  );
  const [formData, setFormData] = useState<any>(
    state
      ? {
          specifications: state?.specifications,
          ...populateFormData(couponFormFields, state),
        }
      : {}
  );
  const [formField, setFormFields] = useState(
    state ? populateFormFields(couponFormFields, state) : couponFormFields
  );

  useEffect(() => {
    const fetchData = async () => {
      const fetchUrl = `${endpoints["Coupons"].read}${couponId}`;
      const resp: any = await Fetch(fetchUrl);
      if (resp?.success) {
        const response = populateFormFields(couponFormFields, resp?.data);
        const localFormData = populateFormData(couponFormFields, resp?.data);
        setFormFields(response);
        setFormData({
          ...localFormData,
          specifications: resp?.data?.specifications,
        });
        setLoading(false);
        setProductFetched(true);
      }
    };
    if (!state && couponId) fetchData();
  }, [couponId, state]);

  useEffect(() => {
    const fetchCategory = async () => {
      const response: any = await Fetch("coupon/get", {}, 5000, true, false);
      if (response?.success && response.data) {
        const selectData = response.data;
        const updatedFormField = formField.map((obj: any) => {
          if (obj.name === "productRestrictions")
            return {
              ...obj,
              options: getSelectFormattedData(selectData?.products),
            };
          if (obj.name === "categoryRestrictions")
            return {
              ...obj,
              options: getSelectFormattedData(selectData?.categories),
            };
          return obj;
        });
        setFormFields(updatedFormField);
      }
    };
    if (productFetched) fetchCategory();
    // eslint-disable-next-line
  }, [productFetched]);

  if (loading && couponId) return <SkeletonLoader />;

  const makeApiCall = async (data: any) => {
    try {
      let url = "";
      const updatedData = {
        ...data,
        productRestrictions: data?.productRestrictions.map((product: any) => ({
          productId: product,
        })),
        categoryRestrictions: data?.categoryRestrictions.map(
          (category: any) => ({ categoryId: category })
        ),
      };
      if (couponId) url = `${endpoints["Coupons"].update}${couponId}`;
      else url = `${endpoints["Coupons"].create}`;
      const response: any = couponId
        ? await Put(url, updatedData)
        : await Post(url, updatedData);
      if (response.success) return navigate(endpoints["Coupons"].all);
      else return toast.error("Something went wrong!");
    } catch (error) {
      return toast.error("Something went wrong!");
    }
  };

  return (
    <div className="bg-gray-100">
      <Back link="/coupons" />
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

export default ManageCouponForm;
