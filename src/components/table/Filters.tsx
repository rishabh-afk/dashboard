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
    <div className="pr-4 pb-4 grid grid-cols-5 gap-3 justify-between items-end">
      <div className=" relative col-span-3">
        <ResponsiveDateRangePickers
          endDate={endDate}
          startDate={startDate}
          setEndDate={setEndDate}
          setStartDate={setStartDate}
        />
      </div>
      <div className="col-span-2 grid grid-cols-2 gap-3 items-center">
        <div>
          <select
            value={
              includes(itemsPerPageOptions, paginate?.itemsPerPage)
                ? paginate?.itemsPerPage
                : ""
            }
            onChange={(e) => handleItemsPerPage(Number(e.target.value))}
            className="border border-gray-400 rounded-lg outline-none p-[7px] w-full"
          >
            <option value="" disabled>
              Select
            </option>
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button
            onClick={handleReset}
            className="border border-gray-400 hover:bg-primary/80 hover:text-white rounded-lg text-lg p-[4px] w-full"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
