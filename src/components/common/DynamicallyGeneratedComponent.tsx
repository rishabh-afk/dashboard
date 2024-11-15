import { useState } from "react";
import { toast } from "react-toastify";
import EditableObjectComponent from "./EditableObjectComponent";

type ComponentType = "String" | "Number" | "List";

const DynamicallyGeneratedComponent = ({
  formData,
  setFormData,
  hideInstructions,
}: {
  formData: any;
  setFormData: any;
  hideInstructions?: boolean;
}) => {
  let [currentKey, setCurrentKey] = useState<string>("");
  const [currentValue, setCurrentValue] = useState<string>("");
  const [listValues, setListValues] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<ComponentType | null>(null);

  const handleAddField = () => {
    if (!currentKey) return toast.error("Key is required.");
    if (selectedType !== "List" && !currentValue)
      return toast.error("Value is required.");

    if (selectedType === "Number" && isNaN(Number(currentValue)))
      return toast.error("Please enter a valid number.");

    if (formData?.specifications?.hasOwnProperty(currentKey))
      return toast.error("Key already exists. Please enter a unique key.");

    let value: string | number | string[] = currentValue;
    if (selectedType === "Number") value = Number(currentValue);
    if (selectedType === "List") value = [...listValues];

    currentKey = currentKey.toLowerCase().split(" ").join("_");
    setFormData((prev: any) => ({
      ...prev,
      specifications: { ...prev?.specifications, [currentKey]: value },
    }));
    resetInputFields();
  };

  const resetInputFields = () => {
    setCurrentKey("");
    setListValues([]);
    setCurrentValue("");
    setSelectedType(null);
  };

  const addToList = () => {
    if (!currentKey)
      return toast.info("Please add a key before adding list values.");
    if (!currentValue)
      return toast.info("Please enter a value to add to the list.");

    setListValues([...listValues, currentValue]);
    setCurrentValue("");
  };

  return (
    <div className="rounded-lg w-full">
      {!hideInstructions && (
        <div className="mb-4">
          <h2 className="text-2xl mb-2 font-semibold">Instructions</h2>
          <ul className="list-inside list-disc text-sm">
            <li>
              Choose a type from the tabs below (String, Number, or List).
            </li>
            <li>Enter a unique key and its value.</li>
            <li>
              For List type, you can add multiple values by clicking the "+"
              button after each item.
            </li>
            <li>When you're ready, click "Add Field" to save your entry.</li>
          </ul>
        </div>
      )}
      {!hideInstructions && (
        <div className="mb-4 flex space-x-2">
          {["String", "Number", "List"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type as ComponentType)}
              className={`px-4 py-1 rounded-lg ${
                selectedType === type
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      )}

      {selectedType && (
        <div className="mb-2 grid grid-cols-4 gap-5">
          <input
            type="text"
            value={currentKey}
            onChange={(e) => setCurrentKey(e.target.value)}
            placeholder="Enter key"
            className="border border-gray-300 col-span-2 rounded-lg p-2 h-fit w-full"
          />

          {selectedType === "List" ? (
            <div className="col-span-2">
              <div className="flex gap-2 justify-center items-center">
                <input
                  type="text"
                  value={currentValue}
                  onChange={(e) => setCurrentValue(e.target.value)}
                  placeholder="Enter list item"
                  className="border border-gray-300 rounded-lg p-2 w-full h-fit"
                />
                <span
                  onClick={addToList}
                  className="w-8 h-8 pb-1 flex justify-center items-center bg-green-500 text-white rounded-full text-2xl cursor-pointer"
                >
                  +
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {listValues.map((item, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-200 text-blue-800 rounded"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <input
              type={selectedType === "Number" ? "number" : "text"}
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
              placeholder={`Enter ${selectedType.toLowerCase()} value`}
              className="border border-gray-300 col-span-2 rounded-lg h-fit p-2 w-full"
            />
          )}

          <button
            onClick={handleAddField}
            className="px-4 py-2 h-fit bg-blue-500 text-white rounded-lg"
          >
            + Add Field
          </button>
        </div>
      )}
      {formData?.specifications && (
        <EditableObjectComponent
          setFormData={setFormData}
          hideInstructions={hideInstructions}
          keyValuePairs={formData?.specifications}
        />
      )}
    </div>
  );
};

export default DynamicallyGeneratedComponent;
