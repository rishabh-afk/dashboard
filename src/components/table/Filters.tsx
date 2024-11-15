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
    if (paginate.totalItems < 6) return;
    await fetchFilteredData({ limit: itemsPerPage });
  };

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
            value={paginate?.itemsPerPage}
            onChange={(e) => handleItemsPerPage(Number(e.target.value))}
            className="border border-gray-400 rounded outline-none p-2 w-full"
          >
            <option value="">--Select--</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
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
