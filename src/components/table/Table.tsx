import dayjs from "dayjs";
import { toast } from "react-toastify";
import { assign } from "../../utils/polyfills";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../../data/endpoints";
import React, { useEffect, useState } from "react";
import { Delete, Fetch } from "../../utils/apiUtils";
const Filters = React.lazy(() => import("./Filters"));
const Pagination = React.lazy(() => import("./Pagination"));
const CustomTable = React.lazy(() => import("./CustomTable"));
const SearchFilter = React.lazy(() => import("./SearchFilter"));

interface PaginationRequest {
  totalPages: number;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
}

const Table = ({
  classes,
  columns,
  formType,
  responseData,
  filterOptions,
  paginationData,
  SearchPlaceholder = "Search By...",
}: {
  classes?: any;
  columns?: any;
  formType?: string;
  responseData?: any;
  filterOptions?: any;
  paginationData?: any;
  SearchPlaceholder?: string;
}) => {
  const navigate = useNavigate();
  const [paginate, setPaginate] = useState<PaginationRequest>({
    totalPages: paginationData?.totalPages ?? 0,
    totalItems: paginationData?.totalItems ?? 0,
    currentPage: paginationData?.currentPage ?? 1,
    itemsPerPage: paginationData?.itemsPerPage ?? 10,
  });

  const [activeStatus, setActiveStatus] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [sort, setSortConfig] = useState<any>({
    key: "",
    direction: null,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null);
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [filteredData, setFilteredData] = useState<any>(responseData ?? []);

  useEffect(() => {
    if (endDate && startDate) {
      fetchFilteredData({ end: endDate, start: startDate });
    }
    // eslint-disable-next-line
  }, [endDate, startDate]);

  const handlePageChange = async (page: number) => {
    await fetchFilteredData({ page: page });
  };

  const handleSearch = (searchTerm: string, selectedOption: string) => {
    if (searchTerm && searchTerm.length < 4)
      return toast.warn("Search term must be at least 4 characters");
    setSearchTerm(searchTerm);
    setSelectedField(selectedOption);
    fetchFilteredData({ search: searchTerm, selectedField: selectedOption });
  };

  const handleReset = async () => {
    setEndDate(null);
    setStartDate(null);
    setSearchTerm("");
    await fetchFilteredData({
      page: 1,
      limit: 10,
      end: null,
      start: null,
      sortkey: "",
      sortdir: "",
      status: "all",
    });
  };

  const handleEdit = async (id: string) => {
    if (formType && id) {
      const fetchUrl = `${endpoints[formType].read}${id}`;
      const redirectionUrl = `${endpoints[formType].redirectUrl}${id}`;
      const resp: any = await Fetch(fetchUrl);
      if (resp?.success) {
        const state = resp?.data;
        return navigate(redirectionUrl, { state });
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (formType && id) {
      const fetchUrl = endpoints[formType].fetchAll;
      const deleteUrl = `${endpoints[formType].delete}${id}`;
      const response: any = await Delete(deleteUrl);
      if (response?.success) {
        const resp: any = await Fetch(fetchUrl);
        if (resp?.success) {
          setFilteredData(resp?.data?.result);
          setPaginate(resp?.data?.pagination);
        }
      }
    }
  };

  const fetchFilteredData = async (filterParams?: any) => {
    const data = {
      sortkey: filterParams?.key ?? sort.key,
      search: filterParams?.search ?? searchTerm,
      sortdir: filterParams?.dir ?? sort.direction,
      status: filterParams?.status ?? activeStatus,
      current: filterParams?.page ?? paginate.currentPage,
      limit: filterParams?.limit ?? paginate.itemsPerPage,
      selectedField: filterParams?.selectedField ?? selectedField,
      end:
        filterParams?.end || startDate
          ? dayjs(filterParams?.end ?? endDate).format("YYYY-MM-DD")
          : null,
      start:
        filterParams?.start || endDate
          ? dayjs(filterParams?.start ?? startDate).format("YYYY-MM-DD")
          : null,
    };

    if (data?.sortkey && (data?.sortkey === "asc" || data?.sortkey === "desc"))
      setSortConfig({
        value: data?.sortkey,
        direction: data?.sortdir,
      });

    if (data?.status) setActiveStatus(data?.status);

    if (data.current * data.limit === paginate.totalItems) {
      setPaginate({
        ...paginate,
        currentPage: data.current,
        itemsPerPage: data.limit,
      });
      return;
    }

    setPaginate({
      ...paginate,
      currentPage: data.current,
      itemsPerPage: data.limit,
    });
    let params: any = { page: data.current, limit: data.limit };

    if (searchTerm && searchTerm.length > 3)
      assign(params, { search: searchTerm });
    if (activeStatus !== "all" && data?.status !== "all")
      assign(params, {
        status: data?.status ? data.status : activeStatus,
      });

    if (startDate || data?.start)
      assign(params, {
        startDate: dayjs(data?.start ?? startDate).format("YYYY-MM-DD"),
      });
    if (endDate || data?.end)
      assign(params, {
        endDate: dayjs(data?.end ?? endDate).format("YYYY-MM-DD"),
      });

    if (sort.key || data?.sortkey)
      assign(params, {
        sortkey: data?.sortkey ?? sort.key,
        sortdir: data?.sortdir ?? sort.direction,
      });

    setFilteredData(responseData);
    if (formType) {
      const fetchUrl = endpoints[formType].fetchAll;
      const resp: any = await Fetch(fetchUrl, params);
      if (resp?.success) {
        setFilteredData(resp?.data?.result);
        setPaginate(resp?.data?.pagination);
      }
    }
  };

  return (
    <div className={`${classes ? classes : "pt-20"}`}>
      <div className="grid grid-cols-2 gap-5">
        <SearchFilter
          options={filterOptions}
          onSearch={handleSearch}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder={SearchPlaceholder}
        />
        <Filters
          endDate={endDate}
          paginate={paginate}
          startDate={startDate}
          setEndDate={setEndDate}
          handleReset={handleReset}
          setStartDate={setStartDate}
          fetchFilteredData={fetchFilteredData}
        />
      </div>
      <CustomTable
        columns={columns}
        data={filteredData}
        onEdit={handleEdit}
        onDelete={handleDelete}
        fetchFilteredData={fetchFilteredData}
      />
      <Pagination
        onPageChange={handlePageChange}
        totalPages={paginate.totalPages}
        totalItems={paginate.totalItems}
        currentPage={paginate.currentPage}
        itemsPerPage={paginate.itemsPerPage}
      />
    </div>
  );
};

export default Table;
