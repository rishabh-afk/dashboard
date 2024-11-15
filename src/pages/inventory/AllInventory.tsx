import { useEffect, useState } from "react";
import { endpoints } from "../../data/endpoints";
import { Delete, Fetch } from "../../utils/apiUtils";
import Pagination from "../../components/table/Pagination";
import CustomTable from "../../components/table/CustomTable";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DeleteModal from "../../components/modals/DeleteModal";

const columns = [
  { key: "sku", label: "SKU", isSortable: false },
  { key: "price", label: "Current Price", isSortable: false },
  { key: "sold", label: "Sold", isSortable: false },
  { key: "stock", label: "Stock (left)", isSortable: false },
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

const AllInventory = () => {
  const formType = "Inventory";
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id: productId } = useParams();
  const [paginate, setPaginate] = useState<PaginationRequest>({
    totalPages: state?.pagination?.totalPages ?? 0,
    totalItems: state?.pagination?.totalItems ?? 0,
    currentPage: state?.pagination?.currentPage ?? 1,
    itemsPerPage: state?.pagination?.itemsPerPage ?? 10,
  });

  const [loading, setloading] = useState(false);
  const [deleteModalId, setDeleteModalId] = useState("");
  const [filteredData, setFilteredData] = useState(state?.result ?? []);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);

  useEffect(() => {
    const fetchInventory = async () => {
      if (formType && productId) {
        const fetchUrl = `${endpoints[formType].fetchAll}${productId}`;
        const resp: any = await Fetch(fetchUrl);
        if (resp?.success && resp?.data?.result) {
          setFilteredData(resp?.data.result ?? []);
          if (resp?.data?.pagination) setPaginate(resp?.data?.pagination);
        }
      }
    };
    if (!state && productId) fetchInventory();
    // eslint-disable-next-line
  }, [productId]);

  const handleEdit = async (id: string) => {
    if (formType && id) {
      const fetchUrl = `${endpoints[formType].read}${id}`;
      const resp: any = await Fetch(fetchUrl);
      if (resp?.success) {
        const state = resp?.data;
        return navigate(`/manage-inventory/edit-inventory/${id}`, { state });
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!deleteConfirmationModal && !deleteModalId) {
      setDeleteModalId(id);
      return setDeleteConfirmationModal(true);
    }
    if (formType && id && deleteConfirmationModal && deleteModalId) {
      setloading(true);
      const deleteUrl = `${endpoints[formType].delete}${id}`;
      const fetchUrl = `${endpoints[formType].fetchAll}${productId}`;
      const response: any = await Delete(deleteUrl);
      if (response?.success) {
        setloading(false);
        handleClose();
        const resp: any = await Fetch(fetchUrl);
        if (resp?.success) setFilteredData(resp?.data?.result);
      }
    }
    setloading(false);
  };

  const handlePageChange = async (page: number) => {
    setPaginate({ ...paginate, currentPage: page });
    const fetchUrl = `${endpoints[formType].fetchAll}${productId}?page=${page}`;
    const resp: any = await Fetch(fetchUrl);
    if (resp?.success) setFilteredData(resp?.data?.result);
  };

  const handleClose = () => {
    setDeleteModalId("");
    setDeleteConfirmationModal(false);
  };

  return (
    <>
      <DeleteModal
        loading={loading}
        id={deleteModalId}
        handleClose={handleClose}
        handleDelete={handleDelete}
        isVisible={deleteConfirmationModal}
      />
      <CustomTable
        isEdit={true}
        isDelete={true}
        columns={columns}
        data={filteredData}
        onEdit={handleEdit}
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
  );
};

export default AllInventory;
