import { includes } from "../../utils/polyfills";
import ResponsiveDateRangePickers from "./MultipleDateSelector";

const Filters = ({
  endDate,
  paginate,
  startDate,
  setEndDate,
  handleReset,
  setStartDate,
  fetchFilteredData,
}: {
  endDate?: any;
  paginate?: any;
  startDate?: any;
  setEndDate?: any;
  handleReset?: any;
  setStartDate?: any;
  fetchFilteredData?: any;
}) => {
  const handleItemsPerPage = async (itemsPerPage: number) => {
    await fetchFilteredData({ limit: itemsPerPage });
  };

  const getItemsPerPageOptions = () => {
    const options = [5, 10, 20, 50, 100];
    return options.filter(
      (option) => option * paginate.currentPage <= paginate?.totalItems
    );
  };

  const itemsPerPageOptions = getItemsPerPageOptions();

  return (
    <div className="pr-4 pb-4 grid grid-cols-3 gap-5 justify-between items-end">
      <div className=" relative col-span-2">
        <p className="absolute -top-7 lwft-0">Select Date Range:</p>
        <ResponsiveDateRangePickers
          endDate={endDate}
          startDate={startDate}
          setEndDate={setEndDate}
          setStartDate={setStartDate}
        />
      </div>
      <div className="mb-4 col-span-1 grid grid-cols-2 gap-2 items-center">
        <div>
          <label className="block mb-1">Page:</label>
          <select
            value={
              includes(itemsPerPageOptions, paginate?.itemsPerPage)
                ? paginate?.itemsPerPage
                : ""
            }
            onChange={(e) => handleItemsPerPage(Number(e.target.value))}
            className="border border-gray-400 rounded outline-none p-2 w-full"
          >
            <option value="" disabled>
              --Select--
            </option>
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Filters:</label>
          <button
            onClick={handleReset}
            className="border border-gray-400 hover:bg-primary/80 hover:text-white rounded p-2 w-full"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
