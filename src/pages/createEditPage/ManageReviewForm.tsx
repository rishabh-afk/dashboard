import { useEffect, useState } from "react";
import { Fetch } from "../../utils/apiUtils";
import Back from "../../components/common/Back";
import DynamicForm from "../../components/common/DynamicForm";
import { reviewFormFields } from "../../components/forms/formFields";

const ManageReviewForm = () => {
  const [formField, setFormFields] = useState(reviewFormFields);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response: any = await Fetch(
          "admin/products",
          {},
          5000,
          true,
          false
        );
        if (!response || !response.data || !response.data.result) {
          throw new Error("Invalid response structure");
        }
        const fields = reviewFormFields.map((field) => {
          if (field?.name === "productId") {
            return { ...field, options: response.data.result };
          } else return field;
        });
        setFormFields(fields);
      } catch (err) {
        console.log("Failed to fetch product data");
      }
    };
    fetchProductData();
  }, []);

  return (
    <div className="bg-gray-100">
      <Back link="/reviews" />
      <div className="p-4 bg-white shadow-lg rounded-2xl m-4 transition-all duration-300">
        <DynamicForm fields={formField} returnAs="object" />
      </div>
    </div>
  );
};

export default ManageReviewForm;
