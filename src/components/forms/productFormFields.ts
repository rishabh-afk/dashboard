import { formatDate } from "../../data/generalFunctions";

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
  value?: any;
  rows?: number;
  min?: number;
  max?: number;
  minDate?: any;
  accept?: string;
  maxFiles?: number;
  maxSizeMB?: number;
  maxLength?: number;
  multiple?: boolean;
  isVideo?: boolean;
  required?: boolean;
  isMultiple?: boolean;
  placeholder?: string;
  confirmPlaceholder?: string;
  validation?: (value: any) => string | null;
  options?: { label: string; value: string | number }[];
}

export const productFormFields: FormField[] = [
  {
    name: "coverImage",
    label: "Product Cover Image",
    type: "file",
    required: true,
  },
  {
    name: "name",
    label: "Product Name",
    type: "text",
    placeholder: "Enter product name",
    required: true,
  },
  {
    name: "brandName",
    label: "Brand Name",
    type: "text",
    placeholder: "Enter brand name",
    required: true,
  },
  {
    options: [],
    type: "select",
    required: true,
    name: "categoryId",
    label: "Category",
    placeholder: "Select product category",
  },
  {
    options: [],
    type: "select",
    required: true,
    label: "Sub Category",
    name: "subCategoryId",
    placeholder: "Select product sub-category",
  },
  {
    rows: 1,
    name: "description",
    label: "Description",
    type: "textarea",
    required: true,
    placeholder: "Enter product description",
  },
  {
    rows: 1,
    name: "tags",
    type: "textarea",
    required: true,
    label: "Tags (seperated by commas (,))",
    placeholder: "Enter Products Tags (Filter Keywords)",
  },
  {
    max: 9,
    min: 0,
    value: 0,
    maxLength: 20,
    type: "number",
    required: true,
    name: "returnDays",
    label: "Return Days (upto 0-9 days)",
    placeholder: "Enter return days",
  },
  {
    name: "returnable",
    label: "Is this product returnable?",
    type: "choose",
    required: false,
  },
  {
    name: "isPublished",
    label: "Do you want to publish this product?",
    type: "choose",
    required: false,
  },
  {
    name: "gstPercentage",
    label: "GST (%)",
    type: "number",
    placeholder: "Enter GST percentage",
    required: true,
  },
  {
    name: "images",
    label: "Upload Product Images",
    type: "file",
    multiple: true,
    required: true,
  },
];

export const inventoryFormFields: FormField[] = [
  {
    name: "color",
    label: "Product Color",
    type: "text",
    placeholder: "Enter product color",
  },
  {
    name: "hexCode",
    label: "Product Color (in hexCode)",
    type: "text",
    placeholder: "Enter product color (in hexCode for example:- #ffffff)",
  },
  {
    options: [
      { label: "xxs", value: "xxs" },
      { label: "xs", value: "xs" },
      { label: "s", value: "s" },
      { label: "m", value: "m" },
      { label: "l", value: "l" },
      { label: "xl", value: "xl" },
      { label: "xxl", value: "xxl" },
      { label: "xxxl", value: "xxxl" },
      { label: "4xl", value: "4xl" },
      { label: "5xl", value: "5xl" },
      { label: "5", value: "5" },
      { label: "5.5", value: "5.5" },
      { label: "6", value: "6" },
      { label: "6.5", value: "6.5" },
      { label: "7", value: "7" },
      { label: "7.5", value: "7.5" },
      { label: "8", value: "8" },
      { label: "8.5", value: "8.5" },
      { label: "9", value: "9" },
      { label: "9.5", value: "9.5" },
      { label: "10", value: "10" },
      { label: "10.5", value: "10.5" },
      { label: "11", value: "11" },
      { label: "11.5", value: "11.5" },
      { label: "12", value: "12" },
      { label: "13", value: "13" },
      { label: "14", value: "14" },
      { label: "small", value: "small" },
      { label: "medium", value: "medium" },
      { label: "large", value: "large" },
      { label: "extra large", value: "extra large" },
      { label: "queen", value: "queen" },
      { label: "king", value: "king" },
      { label: "standard", value: "standard" },
      { label: "compact", value: "compact" },
      { label: "mini", value: "mini" },
      { label: "max", value: "max" },
      { label: "pro", value: "pro" },
    ],
    type: "select",
    name: "size",
    label: "Size",
    required: true,
    placeholder: "Select product size",
  },
  {
    value: 0,
    maxLength: 20,
    type: "number",
    name: "sizeValue",
    label: "Size Value",
    placeholder: "Enter Size value",
  },
  {
    options: [
      { label: "unit", value: "Unit" },
      { label: "pair", value: "Pair" },
      { label: "dozen", value: "Dozen" },
      { label: "g", value: "Gram" },
      { label: "kg", value: "Kilogram" },
      { label: "mg", value: "Milligram" },
      { label: "ml", value: "Milliliter" },
      { label: "l", value: "Liter" },
      { label: "cc", value: "Cubic Centimeter" },
      { label: "meter", value: "Meter" },
      { label: "inch", value: "Inch" },
      { label: "ft", value: "Feet" },
    ],
    type: "select",
    name: "unit",
    label: "Unit",
    required: true,
    placeholder: "Select product Unit",
  },
  {
    value: 0,
    maxLength: 20,
    type: "number",
    name: "width",
    label: "Dimensions (width)",
    placeholder: "Enter dimensions",
  },
  {
    value: 0,
    maxLength: 20,
    type: "number",
    name: "length",
    label: "Dimensions (Length)",
    placeholder: "Enter dimensions",
  },
  {
    value: 0,
    maxLength: 20,
    type: "number",
    name: "height",
    label: "Dimensions (height)",
    placeholder: "Enter dimensions",
  },
  {
    value: 0,
    maxLength: 20,
    type: "number",
    name: "weight",
    label: "Product Weight",
    placeholder: "Enter product weight",
  },
  {
    min: 0,
    value: 0,
    max: 100,
    maxLength: 20,
    type: "number",
    name: "discount",
    label: "Discount (optional)",
    placeholder: "Enter product discount",
  },
  {
    name: "sku",
    label: "SKU (stock keeping unit)",
    type: "text",
    required: true,
    placeholder: "Enter product SKU",
  },
  {
    value: 0,
    maxLength: 20,
    type: "number",
    name: "stock",
    label: "Stock",
    required: true,
    placeholder: "Enter product stock",
  },
  {
    name: "specialOfferTag",
    label: "Special Offer Tag",
    type: "text",
    placeholder: "Enter Special Offer",
  },
  {
    name: "offerExpiry",
    label: "Offer Expiry",
    type: "date",
    required: false,
    placeholder: "Enter offer expiration date",
  },
  {
    value: 0,
    maxLength: 20,
    type: "number",
    name: "price",
    required: true,
    label: "Product Price",
    placeholder: "Enter product price",
  },
];

export const couponFormFields: FormField[] = [
  {
    name: "code",
    label: "Coupon Code (UPPERCASE)",
    type: "text",
    placeholder: "Enter coupon code",
    required: true,
  },
  {
    options: [],
    type: "select",
    required: true,
    isMultiple: true,
    label: "Product",
    name: "productRestrictions",
    placeholder: "Select Products",
  },
  {
    options: [],
    type: "select",
    required: true,
    isMultiple: true,
    label: "Category",
    name: "categoryRestrictions",
    placeholder: "Select Categorys",
  },
  {
    rows: 5,
    name: "description",
    label: "Description",
    type: "textarea",
    required: true,
    placeholder: "Enter coupon description",
  },
  {
    options: [
      { label: "fixed", value: "Fixed" },
      { label: "percentage", value: "Percentage" },
      { label: "freeShipping", value: "Free Shipping" },
    ],
    type: "select",
    name: "type",
    label: "Coupon Type",
    required: true,
    placeholder: "Select coupon type",
  },
  {
    value: 0,
    maxLength: 20,
    type: "number",
    required: true,
    name: "value",
    label: "Coupon Value",
    placeholder: "Enter coupon value",
  },
  {
    value: 0,
    maxLength: 20,
    type: "number",
    required: true,
    name: "minimumSpend",
    label: "Coupon Minimum Spend (Cart Value)",
    placeholder: "Enter coupon minimum spend",
  },
  {
    value: 0,
    maxLength: 20,
    type: "number",
    required: true,
    name: "maximumSpend",
    label: "Coupon Maximum Spend (Cart Value)",
    placeholder: "Enter coupon maximum spend",
  },

  {
    value: 0,
    maxLength: 20,
    type: "number",
    required: true,
    name: "usageLimit",
    label: "Coupon Limit",
    placeholder: "Enter coupon count",
  },
  {
    min: 1,
    max: 9,
    value: 0,
    maxLength: 20,
    type: "number",
    required: true,
    name: "usageLimitPerUser",
    label: "Coupon allowed per user",
    placeholder: "Enter coupon count per user",
  },
  {
    name: "startDate",
    label: "Offer Start Date",
    type: "date",
    required: false,
    minDate: formatDate(new Date()),
    placeholder: "Enter offer starting date",
  },
  {
    name: "expiryDate",
    label: "Offer End Date",
    type: "date",
    required: false,
    minDate: formatDate(new Date()),
    placeholder: "Enter offer expiration date",
  },
  {
    rows: 5,
    name: "termsAndConditions",
    label: "Terms And Conditions",
    type: "textarea",
    placeholder: "Enter coupon terms and conditions",
  },
  {
    name: "isActive",
    label: "Do you want to activate this coupon?",
    type: "choose",
    required: false,
  },
  {
    name: "stackable",
    label: "Want to combine with other discounts?",
    type: "choose",
    required: false,
  },
  {
    name: "showOnWebsite",
    label: "Do you want to show this on website?",
    type: "choose",
    required: false,
  },
  {
    name: "appliesToFirstOrderOnly",
    label: "Is applicable only on first order?",
    type: "choose",
    required: false,
  },
];

export const categoryFormFields: FormField[] = [
  {
    name: "name",
    label: "Category Name",
    type: "text",
    required: true,
    placeholder: "Enter category name",
  },
  {
    name: "description",
    label: "Category Description",
    type: "textarea",
    required: true,
    placeholder: "Enter category description",
  },
  {
    name: "isActive",
    label: "Do you want to activate this category?",
    type: "choose",
    required: false,
  },
];

export const subcategoryFormFields: FormField[] = [
  {
    name: "name",
    label: "Category Name",
    type: "text",
    required: true,
    placeholder: "Enter category name",
  },
  {
    options: [],
    type: "select",
    required: true,
    name: "categoryId",
    label: "Category",
    placeholder: "Select Category",
  },
  {
    name: "isActive",
    label: "Do you want to activate this sub-category?",
    type: "choose",
    required: false,
  },
  {
    name: "description",
    label: "Category Description",
    type: "textarea",
    required: true,
    placeholder: "Enter category description",
  },
];
