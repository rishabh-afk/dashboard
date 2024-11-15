import React from "react";
import * as XLSX from "xlsx";
import Button from "./Button";
import { toast } from "react-toastify";

interface GenerateExcelButtonProps {
  data: { name: string; [key: string]: any }[]; // Define the data type according to your needs
}

const GenerateExcelButton: React.FC<GenerateExcelButtonProps> = ({ data }) => {
  const handleGenerateExcel = () => {
    if (data.length === 0)
      return toast.warn("No data available to generate Excel file.");

    try {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(workbook, worksheet, "Data Items");

      const timestamp = new Date().toISOString().replace(/[:.-]/g, "_");
      const filename = `${timestamp}.xlsx`;

      XLSX.writeFile(workbook, filename);
    } catch (error) {
      console.error("Error generating Excel file:", error);
      toast.error(
        "An error occurred while generating the Excel file. Please try again."
      );
    }
  };

  return (
    <div className="flex">
      <Button onClick={handleGenerateExcel} text="Download Excel" />
    </div>
  );
};

export default GenerateExcelButton;
