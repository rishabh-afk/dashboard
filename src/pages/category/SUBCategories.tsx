import { useEffect, useState } from "react";
import Back from "../../components/common/Back";
import { endpoints } from "../../data/endpoints";
import { Delete, Fetch } from "../../utils/apiUtils";
import { useLocation, useParams } from "react-router-dom";
import Pagination from "../../components/table/Pagination";
import CustomTable from "../../components/table/CustomTable";
import DeleteModal from "../../components/modals/DeleteModal";
import SubCategoryModal from "../../components/modals/SubCategoryModal";

const columns = [
  { key: "categoryName", label: "Category", isSortable: true },
  { key: "name", label: "Sub-Category", isSortable: true },
  { key: "description", label: "Description", isSortable: false },
  { key: "isActive", label: "Status", isSortable: true },
  {
    key: "createdAt",
    label: "Created At",
    isSortable: false,
    isDate: true,
    dateFormat: "dd/MM/yyyy",
  },
];

interface PaginationRequest {
  totalPages: number;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
}

const SUBCategories = () => {
  const formType = "SCategories";
  const { state } = useLocation();
  const { id: productId } = useParams();
  const [paginate, setPaginate] = useState<PaginationRequest>({
    totalPages: state?.pagination?.totalPages ?? 0,
    totalItems: state?.pagination?.totalItems ?? 0,
    currentPage: state?.pagination?.currentPage ?? 1,
    itemsPerPage: state?.pagination?.itemsPerPage ?? 10,
  });

  const [data, setData] = useState({});
  const [loading, setloading] = useState(false);
  const [showModel, setShowModal] = useState(false);
  const [deleteModalId, setDeleteModalId] = useState("");
  const [filteredData, setFilteredData] = useState(state?.result ?? []);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);

  useEffect(() => {
    const fetchInventory = async () => {
      if (formType) {
        const fetchUrl = `${endpoints[formType].fetchAll}`;
        const resp: any = await Fetch(fetchUrl);
        if (resp?.success && resp?.data?.result) {
          setFilteredData(resp?.data.result ?? []);
          if (resp?.data?.pagination) setPaginate(resp?.data?.pagination);
        }
      }
    };
    if (!state) fetchInventory();
    // eslint-disable-next-line
  }, [productId]);

  const handleDelete = async (id: string) => {
    if (!deleteConfirmationModal && !deleteModalId) {
      setDeleteModalId(id);
      return setDeleteConfirmationModal(true);
    }
    if (formType && id && deleteConfirmationModal && deleteModalId) {
      setloading(true);
      const deleteUrl = `${endpoints[formType].delete}${id}`;
      const fetchUrl = `${endpoints[formType].fetchAll}`;
      const response: any = await Delete(deleteUrl);
      if (response?.success) {
        setloading(false);
        handleClose();
        const resp: any = await Fetch(fetchUrl);
        if (resp?.success) setFilteredData(resp?.data?.result);
        if (resp?.success && resp?.data?.pagination)
          setPaginate(resp?.data?.pagination);
      }
    }
    setloading(false);
  };

  const handlePageChange = async (page: number) => {
    setPaginate({ ...paginate, currentPage: page });
    const fetchUrl = `${endpoints[formType].fetchAll}?page=${page}`;
    const resp: any = await Fetch(fetchUrl);
    if (resp?.success) setFilteredData(resp?.data?.result);
  };

  const handleClose = () => {
    setDeleteModalId("");
    setDeleteConfirmationModal(false);
  };

  const handleCreate = async (id: string) => {
    if (id) {
      const fetchUrl = `${endpoints[formType].read}${id}`;
      const resp: any = await Fetch(fetchUrl);
      if (resp?.success) {
        const state = resp?.data;
        setData(state);
        setShowModal(true);
      }
    } else setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setData({});
  };

  return (
    <>
      <Back link="/products" />
      {showModel && (
        <SubCategoryModal
          data={data}
          isVisible={showModel}
          setPaginate={setPaginate}
          handleClose={handleCloseModal}
          setFilteredData={setFilteredData}
        />
      )}
      <DeleteModal
        loading={loading}
        id={deleteModalId}
        handleClose={handleClose}
        handleDelete={handleDelete}
        isVisible={deleteConfirmationModal}
      />
      <>
        <div className="flex justify-between items-center p-4">
          <p className="text-3xl font-semibold">All Sub-Categories</p>
          <button
            type="button"
            onClick={() => handleCreate("")}
            className="bg-primary text-white px-4 py-2 rounded-md"
          >
            + Add Sub-Category
          </button>
        </div>
        <CustomTable
          isEdit={true}
          isDelete={true}
          columns={columns}
          data={filteredData}
          onEdit={handleCreate}
          onDelete={handleDelete}
        />
        <Pagination
          onPageChange={handlePageChange}
          totalPages={paginate.totalPages}
          totalItems={paginate.totalItems}
          currentPage={paginate.currentPage}
          itemsPerPage={paginate.itemsPerPage}
        />
      </>
    </>
  );
};

export default SUBCategories;
