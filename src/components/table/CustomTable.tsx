import { format } from "date-fns";
import { Fetch } from "../../utils/apiUtils";
import { MdInventory2 } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaArrowUp, FaArrowDown, FaEdit, FaTrash } from "react-icons/fa";

// Column type definition with added flexibility
interface Column {
  key: string; // The key for accessing the data
  label: string; // Label to show in the table header
  isSortable?: boolean; // Flag to indicate if the column is sortable
  isDate?: boolean; // Flag to indicate if the column is a date field
  defaultSortOrder?: "asc" | "desc"; // Default sort order for the column
  dateFormat?: string; // Custom date format if the field is a date
}

interface TableProps {
  formType?: string;
  columns: Column[]; // Array of column definitions
  data: any[]; // Array of data rows
  onEdit: (row: any) => void; // Edit handler
  onDelete: (row: any) => void; // Delete handler
  isEdit?: boolean;
  isDelete?: boolean;
  fetchFilteredData?: any;
}

export default function CustomTable({
  data,
  onEdit,
  isEdit,
  columns,
  onDelete,
  isDelete,
  formType,
  fetchFilteredData,
}: TableProps) {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showPopup, setShowPopup] = useState<null | number>(null);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const [sortedData, setSortedData] = useState(data);

  useEffect(() => {
    setSortedData(data); // Reset sorted data when new data comes in
  }, [data]);

  // Handle sorting logic
  const handleSort = (field: string, isDate?: boolean) => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    const newSortedData = [...sortedData].sort((a, b) => {
      const aField = a[field];
      const bField = b[field];

      // Handle date sorting if the column is a date
      if (isDate) {
        const aDate = new Date(aField);
        const bDate = new Date(bField);
        if (aDate < bDate) return order === "asc" ? -1 : 1;
        if (aDate > bDate) return order === "asc" ? 1 : -1;
        return 0;
      }

      // Handle non-date sorting (string or number)
      if (aField < bField) return order === "asc" ? -1 : 1;
      if (aField > bField) return order === "asc" ? 1 : -1;
      return 0;
    });
    setSortedData(newSortedData);
    setSortField(field);
    setSortOrder(order);
    fetchFilteredData({ key: field, dir: order });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      )
        setShowPopup(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const manageInventory = async (id: string) => {
    const response: any = await Fetch(
      "inventory/get-by-product?productId=" + id
    );
    if (response?.success) {
      const state = response?.data;
      return navigate("/manage-inventory/" + id, { state });
    }
  };

  return (
    <div className="overflow-x-auto p-4 pt-0 pb-16 animate-fade-up">
      <table className="min-w-full text-left overflow-x-auto border-y-collapse">
        <thead>
          <tr>
            {/* <th className="border-y border-gray-300 p-3">
              <input type="checkbox" className="w-4 h-4" />
            </th> */}
            {/* Dynamically render columns */}
            {columns.map((column) => (
              <th
                key={column.key}
                className={`border-y w-40 border-gray-300 p-3 cursor-pointer font-medium text-lg ${
                  column.isSortable ? "cursor-pointer" : ""
                }`}
                onClick={() =>
                  column.isSortable
                    ? handleSort(column.key, column.isDate)
                    : undefined
                }
              >
                <span className="flex items-center gap-1">
                  {column.label}
                  {sortField === column.key &&
                    (sortOrder === "asc" ? (
                      <FaArrowUp size={15} />
                    ) : (
                      <FaArrowDown size={15} />
                    ))}
                </span>
              </th>
            ))}
            {(isEdit || isDelete) && (
              <th className="border-y border-gray-300 p-3 font-medium text-lg">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {sortedData.length > 0 ? (
            sortedData.map((row, index) => (
              <tr
                key={index}
                className="transition-all w-40 text-sm hover:bg-gray-100"
              >
                {/* <td className="border-y border-gray-300 p-3">
                  <input type="checkbox" className="w-4 h-4" />
                </td> */}
                {/* Dynamically render data cells based on the columns */}
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="border-y border-gray-300 p-3 whitespace-nowrap"
                  >
                    {(() => {
                      const value = row[column.key];
                      if (column.key === "coverImage" && value) {
                        return (
                          <div className="flex items-center gap-2">
                            <img
                              src={value}
                              alt="Cover"
                              className="h-12 w-12 rounded object-cover"
                            />
                            <div>
                              <div className="font-medium text-gray-700">
                                {row["_id"]
                                  ? "#" + row["_id"].slice(-8).toUpperCase()
                                  : "-"}
                              </div>
                              <div className="text-sm text-gray-500 pr-10">
                                {row["name"].length > 25
                                  ? row["name"].slice(0, 25) + "..."
                                  : row["name"] ?? "-"}
                              </div>
                            </div>
                          </div>
                        );
                      }
                      if (column.isDate && value)
                        return format(
                          new Date(value),
                          column.dateFormat || "dd/MM/yyyy"
                        );

                      if ([true, false, 0, 1].includes(value))
                        return value.toString();
                      if (column.key === "_id" && typeof value === "string")
                        return "#" + value.slice(-8).toUpperCase();

                      if (
                        [
                          "description",
                          "metaTitle",
                          "content",
                          "title",
                        ].includes(column.key) &&
                        typeof value === "string"
                      )
                        return value.length > 50
                          ? value.slice(0, 50) + "..."
                          : value;

                      return value ?? "-";
                    })()}
                  </td>
                ))}
                <td className="border-y relative border-gray-300 p-3 text-left">
                  {(isEdit || isDelete) && (
                    <button
                      onClick={() =>
                        setShowPopup(showPopup === index ? null : index)
                      }
                      className="border border-gray-300 px-2 py-0.5 rounded-md"
                    >
                      More
                    </button>
                  )}
                  {showPopup === index && (
                    <div
                      ref={dropdownRef}
                      className={`absolute mt-1 ${
                        formType === "Products" ? "right-12" : "-left-7"
                      } bg-white border border-gray-300 shadow-lg rounded-md z-10`}
                    >
                      {isEdit && (
                        <button
                          className="block px-4 w-full text-left py-1 text-sm hover:bg-gray-200"
                          onClick={() => onEdit(row?._id)}
                        >
                          <FaEdit className="inline-block text-blue-500 mr-1" />{" "}
                          Edit
                        </button>
                      )}
                      {isDelete && (
                        <button
                          className="block px-4 w-full text-left py-1 text-sm hover:bg-gray-200"
                          onClick={() => onDelete(row?._id)}
                        >
                          <FaTrash className="inline-block text-red-500 mr-1" />{" "}
                          Delete
                        </button>
                      )}
                      {formType === "Products" && (
                        <button
                          className="block px-4 w-full text-left whitespace-nowrap py-1 text-sm hover:bg-gray-200"
                          onClick={() => manageInventory(row?._id)}
                        >
                          <MdInventory2 className="inline-block text-green-500 mr-1" />{" "}
                          Manage Inventory
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 2} className="text-center p-4">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
