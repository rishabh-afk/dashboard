import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";

interface DataObject {
  [key: string]: string | number | string[];
}

const EditableObjectComponent = ({
  setFormData,
  keyValuePairs,
  hideInstructions,
}: {
  setFormData: any;
  keyValuePairs: any;
  hideInstructions?: boolean;
}) => {
  let [data, setData] = useState<DataObject>(keyValuePairs ?? {});

  useEffect(() => {
    setData(keyValuePairs);
  }, [keyValuePairs]);

  const handleInputChange = (key: string, value: string | number) => {
    setFormData((prev: any) => ({
      ...prev,
      specifications: { ...prev?.specifications, [key]: value },
    }));
  };

  const handleListChange = (key: string, index: number, newValue: string) => {
    if (Array.isArray(data[key])) {
      const updatedList = [...(data[key] as string[])];
      updatedList[index] = newValue;
      setFormData((prev: any) => ({
        ...prev,
        specifications: { ...prev?.specifications, [key]: updatedList },
      }));
    }
  };

  const addListItem = (key: string) => {
    if (Array.isArray(data[key])) {
      setFormData((prev: any) => ({
        ...prev,
        specifications: {
          ...prev?.specifications,
          [key]: [...(data[key] as string[]), ""],
        },
      }));
    }
  };

  const removeListItem = (key: string, index: number) => {
    if (Array.isArray(data[key])) {
      const updatedList = (data[key] as string[]).filter((_, i) => i !== index);
      setFormData((prev: any) => {
        const newFormData = {
          ...prev,
          specifications: { ...prev?.specifications },
        };
        if (updatedList.length === 0) delete newFormData.specifications[key];
        else newFormData.specifications[key] = updatedList;
        return newFormData;
      });
    }
  };

  const removeItem = (key: string) => {
    setFormData((prev: any) => {
      const newFormData = {
        ...prev,
        specifications: { ...prev?.specifications },
      };
      if (newFormData.specifications[key])
        delete newFormData.specifications[key];
      return newFormData;
    });
  };

  return (
    <div className="grid grid-cols-3 gap-5">
      {Object.entries(data).map(([key, value]) => (
        <div
          key={key}
          className={`flex flex-col ${Array.isArray(value) && "col-span-3"}`}
        >
          <label
            className={`font-semibold capitalize mb-1 ${
              hideInstructions && "text-lg"
            }`}
          >
            {key.split(/(?=[A-Z])|_/).join(" ")}
          </label>

          {/* Check the type of value and render accordingly */}
          {typeof value === "string" && (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={value}
                onChange={(e) => handleInputChange(key, e.target.value)}
                className="border p-2 rounded-lg w-full"
              />
              {!hideInstructions && (
                <span
                  onClick={() => removeItem(key)}
                  className="text-red-500 font-bold cursor-pointer hover:text-red-600 transition-all duration-200"
                >
                  <MdDelete className="text-2xl hover:scale-125 transition-all duration-200 ease-linear" />
                </span>
              )}
            </div>
          )}

          {typeof value === "number" && (
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={value}
                onChange={(e) => handleInputChange(key, Number(e.target.value))}
                className="border p-2 rounded-lg w-full"
              />
              {!hideInstructions && (
                <span
                  onClick={() => removeItem(key)}
                  className="text-red-500 font-bold cursor-pointer hover:text-red-600 transition-all duration-200"
                >
                  <MdDelete className="text-2xl hover:scale-125 transition-all duration-200 ease-linear" />
                </span>
              )}
            </div>
          )}

          {Array.isArray(value) && (
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-3 gap-3">
                {value.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) =>
                        handleListChange(key, index, e.target.value)
                      }
                      className="border p-2 rounded-lg w-full"
                    />
                    {!hideInstructions && (
                      <span
                        onClick={() => removeListItem(key, index)}
                        className="text-red-500 font-bold cursor-pointer hover:text-red-600 transition-all duration-200"
                      >
                        <MdDelete className="text-2xl hover:scale-125 transition-all duration-200 ease-linear" />
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <span
                onClick={() => addListItem(key)}
                className="bg-blue-500 w-fit cursor-pointer text-white py-1 px-3 rounded-lg hover:bg-blue-600"
              >
                + Add Item
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default EditableObjectComponent;
