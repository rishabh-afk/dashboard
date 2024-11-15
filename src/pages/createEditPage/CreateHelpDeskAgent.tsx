import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Back from "../../components/common/Back";
import { includes } from "../../utils/polyfills";
import Select from "../../components/input/Select";
import { Fetch, Post } from "../../utils/apiUtils";
import ToggleButton from "../../components/input/Toggle";
import { useNavigate } from "react-router-dom";

const tags = [
  { label: "Payment Due", value: "payment_due" },
  { label: "Payment Failed", value: "payment_failed" },
  { label: "Payment Pending", value: "payment_pending" },
  { label: "Product Defect", value: "product_defect" },
  { label: "Technical Issue", value: "technical_issue" },
  { label: "Fraudulent Activity", value: "fraudulent_activity" },
  { label: "Account Suspended", value: "account_suspended" },
  { label: "Service Disruption", value: "service_disruption" },
  { label: "Escalated", value: "escalated" },
  { label: "Resolved", value: "resolved" },
  { label: "Invoice Sent", value: "invoice_sent" },
  { label: "Partial Payment", value: "partial_payment" },
  { label: "Refund Approved", value: "refund_approved" },
  { label: "Refund Processed", value: "refund_processed" },
  { label: "Refund Requested", value: "refund_requested" },
  { label: "New Customer", value: "new_customer" },
  { label: "High Risk", value: "high_risk" },
  { label: "Vip Customer", value: "vip_customer" },
  { label: "On Hold", value: "on_hold" },
  { label: "Order Placed", value: "order_placed" },
  { label: "Order Shipped", value: "order_shipped" },
  { label: "Order Delivered", value: "order_delivered" },
  { label: "Order Cancelled", value: "order_cancelled" },
  { label: "Shipment Delayed", value: "shipment_delayed" },
  { label: "Return Initiated", value: "return_initiated" },
  { label: "Exchange Requested", value: "exchange_requested" },
  { label: "Customer Complaint", value: "customer_complaint" },
  { label: "Awaiting Response", value: "awaiting_response" },
  { label: "Loyal Customer", value: "loyal_customer" },
  { label: "Inactive Customer", value: "inactive_customer" },
  { label: "Terms Of Service Accepted", value: "terms_of_service_accepted" },
  { label: "Data Privacy", value: "data_privacy" },
  { label: "Marketing Campaign", value: "marketing_campaign" },
  { label: "Abandoned Cart", value: "abandoned_cart" },
  { label: "Product Review", value: "product_review" },
  { label: "Discount Applied", value: "discount_applied" },
  { label: "Newsletter Signup", value: "newsletter_signup" },
  { label: "Security Breach", value: "security_breach" },
];

const field = {
  name: "userId",
  label: "Agent",
  type: "select",
  required: true,
  placeholder: "-- Select Agent --",
};
const fieldToggle = {
  type: "choose",
  name: "isActive",
  required: false,
  label: "Do you want to activate this agent?",
};

const CreateHelpDeskAgent = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<any>([]);
  const [skills, setSkills] = useState<any>([]);
  const [active, setActive] = useState<any>(false);
  const [userId, setUserId] = useState<any>("");
  const handleInputChange = (e: any) => {
    const { value, name } = e.target;
    if (name === "userId") setUserId(value);
  };
  const handleAddSkills = (skill: string) => {
    setSkills((prev: string[]) =>
      includes(prev, skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };
  const selectAll = () => {
    if (skills.length === tags.length) return setSkills([]);
    setSkills(tags.map((tag: any) => tag?.value));
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response: any = await Fetch(
          "ticket/agents/unique",
          {},
          5000,
          true,
          false
        );
        if (
          response?.success &&
          response?.data?.result &&
          response?.data?.result.length > 0
        ) {
          const data = response?.data?.result.map((option: any) => ({
            value: option?.name,
            label: option?._id,
          }));
          setUsers(data);
        } else setUsers([]);
      } catch (error) {
        console.error(error);
      }
    };
    if (users.length === 0) fetchUsers();
  }, [users.length]);

  const handleSubmit = async () => {
    if (!userId) return toast.warn("Please select a agent");
    if (!active) return toast.warn("Please activate or deactivate account");
    if (skills.length < 3) return toast.warn("Please select atleast 3 skills");
    try {
      const response: any = await Post("ticket/create-agent", {
        skills: skills,
        userId: userId,
        availability: active?.isActive,
      });
      if (response?.success) return navigate("/help-desk");
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Back link="/help-desk" />
      <div className="p-4 bg-white shadow-lg rounded-2xl m-4 transition-all duration-300 min-h-[85vh]">
        <h2 className="text-2xl font-semibold">Create Agent</h2>
        <div className="mt-5">
          <div className="grid grid-cols-2 gap-5">
            <Select
              handleInputChange={handleInputChange}
              field={{ ...field, options: users ?? [], value: userId }}
            />
            <ToggleButton field={fieldToggle} setState={setActive} />
          </div>
          <div className="flex my-5 justify-between items-center">
            <p className="font-medium">Select Skills / Expertise</p>
            <button
              type="button"
              className="text-sm bg-primary text-white px-2 py-1 rounded"
              onClick={selectAll}
            >
              {skills.length === tags.length ? "Deselect all" : "Select All"}
            </button>
          </div>
          <div className="flex gap-2 flex-wrap">
            {tags.map((tag: any, index: number) => {
              return (
                <span
                  key={index}
                  onClick={() => handleAddSkills(tag?.value)}
                  className={`text-white text-sm cursor-pointer px-2 py-1 rounded outline-none transition-all duration-200 ease-in-out transform ${
                    includes(skills, tag?.value)
                      ? "bg-blue-500 shadow-2xl hover:scale-105 hover:translate-y-[-2px]"
                      : "bg-blue-300 shadow-sm hover:bg-blue-500 hover:scale-110 hover:translate-y-[-2px]"
                  }`}
                >
                  {tag?.label}
                </span>
              );
            })}
          </div>
          <div className="flex gap-2 mt-5 items-center">
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 rounded-md text-lg text-white bg-blue-500"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => navigate("/help-desk")}
              className="px-4 py-2 rounded-md text-lg text-white bg-red-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateHelpDeskAgent;
