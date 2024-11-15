import { useEffect, useRef, useState } from "react";
import { FaArrowUp, FaArrowDown, FaEdit, FaTrash } from "react-icons/fa";
import { format } from "date-fns"; // To handle date formatting

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
  columns: Column[]; // Array of column definitions
  data: any[]; // Array of data rows
  onEdit: (row: any) => void; // Edit handler
  onDelete: (row: any) => void; // Delete handler
  fetchFilteredData?: any;
}

export default function CustomTable({
  data,
  onEdit,
  columns,
  onDelete,
  fetchFilteredData,
}: TableProps) {
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

  return (
    <div className="overflow-x-auto p-4 pt-0 pb-16">
      <table className="min-w-full text-left overflow-x-auto border-y-collapse">
        <thead>
          <tr>
            <th className="border-y border-gray-300 p-3">
              <input type="checkbox" className="w-4 h-4" />
            </th>
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
            <th className="border-y border-gray-300 p-3 font-medium text-lg">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.length > 0 ? (
            sortedData.map((row, index) => (
              <tr
                key={index}
                className="transition-all w-40 text-sm hover:bg-gray-100"
              >
                <td className="border-y border-gray-300 p-3">
                  <input type="checkbox" className="w-4 h-4" />
                </td>
                {/* Dynamically render data cells based on the columns */}
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="border-y border-gray-300 p-3 whitespace-nowrap"
                  >
                    {column.isDate && row[column.key]
                      ? // If column is marked as date, format it
                        format(
                          new Date(row[column.key]),
                          column.dateFormat || "dd/MM/yyyy",
                        )
                      : row[column.key]}
                  </td>
                ))}
                <td className="border-y relative border-gray-300 p-3 text-left">
                  <button
                    onClick={() =>
                      setShowPopup(showPopup === index ? null : index)
                    }
                    className="border border-gray-300 px-2 py-0.5 rounded-md"
                  >
                    More
                  </button>
                  {showPopup === index && (
                    <div
                      ref={dropdownRef}
                      className="absolute mt-1 -left-7 bg-white border border-gray-300 shadow-lg rounded-md z-10"
                    >
                      <button
                        className="block px-4 w-full text-left py-1 text-sm hover:bg-gray-200"
                        onClick={() => onEdit(row?._id)}
                      >
                        <FaEdit className="inline-block mr-1" /> Edit
                      </button>
                      <button
                        className="block px-4 w-full text-left py-1 text-sm hover:bg-gray-200"
                        onClick={() => onDelete(row?._id)}
                      >
                        <FaTrash className="inline-block mr-1" /> Delete
                      </button>
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
