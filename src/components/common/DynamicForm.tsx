import Button from "./Button";
import React, { useState } from "react";
import { FormField } from "../forms/formFields";

import Date from "../input/Date";
import Text from "../input/Text";
import Email from "../input/Email";
import Radio from "../input/Radio";
import Number from "../input/Number";
import Select from "../input/Select";
import Checkbox from "../input/Checkbox";
import Password from "../input/Password";
import TextArea from "../input/TextArea";
import ToggleButton from "../input/Toggle";
import NumericStringInput from "../input/NumericString";
import SingleImageUploader from "../input/ImageUploader";
import SingleVideoUploader from "../input/VideoUploader";
import MultipleImageUpload from "../input/MultipleImageUploader";
import MultipleVideoUpload from "../input/MultipleVideoUploader";
import DynamicallyGeneratedComponent from "./DynamicallyGeneratedComponent";

interface DynamicFormProps {
  formData?: any;
  makeApiCall?: any;
  setFormData?: any;
  fields?: FormField[];
  dynamicallyAllowed?: boolean;
  returnAs?: "object" | "formData";
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  fields,
  returnAs,
  formData,
  setFormData,
  makeApiCall,
  dynamicallyAllowed = false,
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [addMoreFields, setAddMoreFields] = useState<boolean>(false);

  const handleInputChange = (e: any) => {
    const { name, type, value, checked, options, multiple, files } = e.target;
    if (multiple) {
      const selectedOptions = Array.from(options)
        .filter((option: any) => option.selected)
        .map((option: any) => option.value);
      setFormData((prev: any) => ({ ...prev, [name]: selectedOptions }));
    } else if (type === "file") {
      if (files) {
        const newFiles = Array.from(files);
        setFormData((prev: any) => ({
          ...prev,
          [name]: prev[name] ? [...prev[name], ...newFiles] : newFiles, // Append new files to existing files
        }));
      }
    } else
      setFormData((prev: any) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
  };
  const validateForm = () => {
    let valid = true;
    const newErrors: { [key: string]: string | null } = {};

    if (!fields) return;

    fields.forEach((field) => {
      const value = formData[field.name];

      if (field.required && !value) {
        newErrors[field.name] = `${field.label} is required`;
        valid = false;
      }

      if (field.validation && value) {
        const error = field.validation(value);
        if (error) {
          newErrors[field.name] = error;
          valid = false;
        }
      }
    });
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      if (returnAs === "formData") {
        const data = new FormData();
        Object.keys(formData).forEach((key) => {
          const value = formData[key];
          if (value instanceof File || Array.isArray(value)) {
            if (Array.isArray(value))
              value.forEach((file) => data.append(key, file));
            else data.append(key, value);
          } else data.append(key, String(value));
        });
        makeApiCall(data);
      } else makeApiCall(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-5">
      {fields &&
        fields.length > 0 &&
        fields.map((field: FormField) => (
          <div
            key={field.name}
            className={`flex flex-col ${
              field?.type === "file" && "col-span-3"
            } ${field?.type === "textarea" && "col-span-2"} ${
              field?.type === "password" && "col-span-2"
            }`}
          >
            {field.type === "select" && (
              <Select
                field={{ ...field, value: formData[field?.name] || "" }}
                handleInputChange={handleInputChange}
              />
            )}

            {field.type === "radio" && (
              <Radio field={field} handleInputChange={handleInputChange} />
            )}

            {field.type === "checkbox" && (
              <Checkbox field={field} handleInputChange={handleInputChange} />
            )}

            {field.type === "email" && (
              <Email
                field={{ ...field, value: formData[field?.name] || "" }}
                handleInputChange={handleInputChange}
              />
            )}

            {field.type === "text" && (
              <Text
                field={{ ...field, value: formData[field?.name] || "" }}
                handleInputChange={handleInputChange}
              />
            )}

            {field.type === "textarea" && (
              <TextArea
                field={{ ...field, value: formData[field?.name] || "" }}
                handleInputChange={handleInputChange}
              />
            )}

            {field.type === "choose" && (
              <ToggleButton
                field={{ ...field, value: formData[field?.name] || false }}
                setState={setFormData}
              />
            )}

            {field.type === "number" && (
              <Number
                field={{ ...field, value: formData[field?.name] || "" }}
                handleInputChange={handleInputChange}
              />
            )}

            {field.type === "date" && (
              <Date
                field={{ ...field, value: formData[field?.name] || "" }}
                handleInputChange={handleInputChange}
              />
            )}

            {field.type === "stringNumeric" && (
              <NumericStringInput
                field={{ ...field, value: formData[field?.name] || "" }}
                handleInputChange={handleInputChange}
              />
            )}

            {field.type === "password" && (
              <Password
                field={{ ...field, value: formData[field?.name] || "" }}
                handleInputChange={handleInputChange}
              />
            )}

            {field.type === "file" && !field.multiple && !field?.isVideo && (
              <SingleImageUploader
                field={{ ...field, value: formData[field?.name] || undefined }}
                setFormData={setFormData}
              />
            )}

            {field.type === "file" && field.multiple && !field?.isVideo && (
              <MultipleImageUpload field={field} setFormData={setFormData} />
            )}

            {field.type === "file" && !field.multiple && field?.isVideo && (
              <SingleVideoUploader field={field} setFormData={setFormData} />
            )}

            {field.type === "file" && field.multiple && field?.isVideo && (
              <MultipleVideoUpload field={field} setFormData={setFormData} />
            )}

            {errors[field.name] && (
              <span className="text-red-500 text-sm mt-1">
                {errors[field.name]}
              </span>
            )}
          </div>
        ))}
      {dynamicallyAllowed && addMoreFields && (
        <div className="col-span-3">
          <DynamicallyGeneratedComponent
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      )}
      {dynamicallyAllowed && !addMoreFields && (
        <span
          className="text-xl col-span-2 cursor-pointer hover:underline hover:underline-offset-2"
          onClick={() => setAddMoreFields(true)}
        >
          + Add More Specifications
        </span>
      )}
      <Button
        text="Submit"
        type="submit"
        classes="col-span-3 w-1/4 bg-primary text-white"
      />
    </form>
  );
};

export default DynamicForm;
