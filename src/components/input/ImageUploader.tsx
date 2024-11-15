"use client";

import { toast } from "react-toastify";
import { IoCloudUpload } from "react-icons/io5";
import React, { FC, useState, useRef } from "react";

interface SingleImageUploaderProps {
  field: {
    name: string;
    label: string;
    value?: string;
    required?: boolean;
  };
  setFormData: (newState: any) => void; // Function to update parent state
}

const SingleImageUploader: FC<SingleImageUploaderProps> = ({
  field,
  setFormData,
}) => {
  const fieldname = field?.name;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(
    field.value ?? null
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const maxSizeInBytes = 1024 * 1024; // 1 MB
      const validTypes = ["image/png", "image/jpeg", "image/jpg"];

      if (file.size > maxSizeInBytes) {
        return toast.warn(
          "File size exceeds 1 MB. Please select a smaller file."
        );
      }

      if (!validTypes.includes(file.type)) {
        return toast.warn(
          "Invalid file type. Please select a PNG, JPG, or JPEG image."
        );
      }

      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);

      const obj = fieldname ? { [fieldname]: file } : { imageUrl: file };
      setFormData((prev: any) => ({ ...prev, ...obj }));
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear file input
    }
    // Clear the state in the parent component
    const obj = fieldname ? { [fieldname]: null } : { imageUrl: null };
    setFormData((prev: any) => ({ ...prev, ...obj }));
  };

  return (
    <div className="flex flex-col justify-start space-y-4">
      <label htmlFor={field.name} className="block font-medium text-gray-700">
        {field.label}
        {field.required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef}
        className="hidden"
      />
      <div
        onClick={() => fileInputRef.current?.click()}
        className="relative flex flex-col justify-start w-40 bg-gray-200 h-40 border-2 border-dashed border-gray-400 rounded-full cursor-pointer hover:border-gray-400 transition-colors duration-300"
      >
        {selectedImage ? (
          <>
            <img
              alt="Selected"
              src={selectedImage}
              className="w-full h-full object-contain rounded-full"
            />
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering file input
                handleRemoveImage();
              }}
              className="absolute -top-3 -right-3 bg-gray-400 text-white w-7 h-7 flex justify-center items-center aspect-square rounded-full p-1 hover:bg-gray-500 transition-all duration-200 ease-linear"
            >
              ✕
            </button>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center h-full text-gray-600">
            <span>
              <IoCloudUpload size={35} className="text-gray-500" />
            </span>
            <span className="text-gray-600">Click to upload</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleImageUploader;
