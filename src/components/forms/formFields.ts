import { countries } from "../../data/data";
import { includes } from "../../utils/polyfills";
export interface FormField {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "password"
    | "file"
    | "date"
    | "multipleFiles"
    | "select"
    | "checkbox"
    | "radio"
    | "number"
    | "textarea"
    | "choose"
    | "stringNumeric";
  min?: number;
  max?: number;
  accept?: string;
  maxFiles?: number;
  maxSizeMB?: number;
  maxLength?: number;
  multiple?: boolean;
  isVideo?: boolean;
  required?: boolean;
  placeholder?: string;
  confirmPlaceholder?: string;
  validation?: (value: any) => string | null;
  options?: { label: string; value: string | number }[];
}

export const formFields: FormField[] = [
  {
    name: "profileImage",
    label: "Profile Image",
    type: "file",
    required: true,
  },
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "Enter your first name",
    required: true,
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Enter your last name",
    required: true,
  },
  {
    name: "mobile",
    maxLength: 20,
    label: "Phone Number",
    type: "stringNumeric",
    placeholder: "Enter your phone number",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    validation: (value) => (includes(value, "@") ? null : "Invalid email"),
  },
  // {
  //   name: "password",
  //   label: "Password",
  //   type: "password",
  //   placeholder: "Enter your password",
  //   confirmPlaceholder: "Re-enter your password",
  // },
  {
    name: "dateOfBirth",
    label: "Date of Birth",
    type: "date",
    required: true,
    placeholder: "Enter your date of birth",
  },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    required: true,
    placeholder: "Select Gender",
    options: [
      { value: "Male", label: "male" },
      { value: "Female", label: "female" },
      { value: "Other", label: "other" },
    ],
  },
  {
    name: "countryCode",
    label: "Country",
    type: "select",
    required: true,
    placeholder: "Select Country",
    options: countries.map((country: any) => ({
      value: country.name,
      label: country.code.slice(1),
    })),
  },
  {
    name: "role",
    label: "Role Type",
    type: "select",
    required: true,
    placeholder: "Select role",
    options: [{ label: "vendor", value: "Vendor" }],
  },
  {
    name: "shopName",
    label: "Shop Name",
    type: "text",
    placeholder: "Enter shop name",
    required: true,
  },
  {
    name: "gst",
    label: "GST Number",
    type: "text",
    placeholder: "Enter GST number",
    required: true,
  },
  {
    name: "shopType",
    label: "Shop Type",
    type: "select",
    required: true,
    placeholder: "Select shop type",
    options: [
      { label: "Retail", value: "Retail" },
      { label: "Online", value: "Online" },
      { label: "Wholesale", value: "Wholesale" },
      { label: "Franchise", value: "Franchise" },
    ],
  },
  {
    name: "isActive",
    label: "Do you want to activate this account?",
    type: "choose",
    required: false,
  },
];

export const reviewFormFields: FormField[] = [
  {
    name: "productId",
    label: "Product",
    type: "select",
    required: true,
    placeholder: "Select Product",
    options: [],
  },
  {
    max: 5,
    min: 1,
    name: "rating",
    maxLength: 20,
    type: "number",
    required: true,
    label: "Ratings",
    placeholder: "Enter rating (upto 5 stars)",
  },
  {
    name: "isPublish",
    label: "Do you want to publish?",
    type: "choose",
    required: true,
  },
  {
    name: "comment",
    label: "Comment",
    type: "textarea",
    required: true,
    placeholder: "Enter comment",
  },
];
