import React, { FC } from "react";

interface Option {
  value: string | number;
  label: string | number;
}

interface SelectProps {
  field: {
    name?: string;
    label?: string;
    value?: string;
    required?: boolean;
    options?: Option[];
    placeholder?: string;
    isDisabled?: boolean;
    isMultiple?: boolean;
    defaultValue?: string | number;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

const Select: FC<SelectProps> = ({ field, handleInputChange, className }) => {
  return (
    <div className="relative">
      <label
        htmlFor={field.name}
        className="block font-medium text-gray-700 mb-2"
      >
        {field.label}
        {field.required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={field.name}
        name={field.name}
        value={field?.value}
        required={field.required}
        disabled={field.isDisabled}
        multiple={field.isMultiple}
        onChange={handleInputChange}
        className={`border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
      >
        {field.placeholder && (
          <option value="" disabled>
            {field.placeholder}
          </option>
        )}
        {field.options?.map((option) => (
          <option key={option.value} value={option.label}>
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
