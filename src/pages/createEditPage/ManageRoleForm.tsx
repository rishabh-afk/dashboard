import { tabs } from "../../data/tabs";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Back from "../../components/common/Back";
import { endpoints } from "../../data/endpoints";
import { Fetch, Put } from "../../utils/apiUtils";
import { convertPermissions } from "../../data/generalFunctions";
import { useLocation, useNavigate, useParams } from "react-router-dom";

interface Permission {
  name: string;
  crudRoles: string[];
}

const permissions: Permission[] = tabs;

const ManageRoleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [userlist, setUserList] = useState<any>([]);
  const [selectedVendor, setSelectedVendor] = useState<string | null>(
    id ?? null
  );
  const [crudPermissions, setCrudPermissions] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    const setResponse = (data: any) => {
      const { role, email, allowedTabs, firstName, lastName } = data;
      const obj = {
        role,
        email,
        allowedTabs,
        name: firstName + " " + lastName,
      };
      setUserList([obj]);
      setCrudPermissions(filterResponse(state));
    };
    const filterResponse = (data: any) => {
      const result =
        data &&
        data.allowedTabs.reduce((acc: any, item: any) => {
          item.crudRoles.forEach((role: string) => {
            acc[`${item.name}-${role}`] = true;
          });
          return acc;
        }, {});
      return result;
    };
    const fetchData = async () => {
      const url = `${endpoints["Users"].read}${id}`;
      const response: any = await Fetch(url);
      if (response.success) setResponse(response?.data);
    };
    if (state) setResponse(state);
    else if (id && !state) fetchData();
    // eslint-disable-next-line
  }, []);

  const handleCheckboxChange = (permissionName: string, role: string) => {
    const key = `${permissionName}-${role}`;
    setCrudPermissions((prev: any) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSubmit = async () => {
    if (!selectedVendor) return toast.info("Please select a User or Vendor");
    const result = convertPermissions(crudPermissions);
    const data = {
      id: selectedVendor,
      allowedTabs: result,
    };
    const response: any = await Put(`user/permission/${data?.id}`, data);
    if (response?.success) navigate(endpoints["Permissions"].all);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const response: any = await Fetch(`user/all`, {}, 5000, true, false);
      if (response.success) setUserList(response.data);
    };
    if (!id) fetchUsers();
  }, [id]);

  return (
    <>
      <Back link="/manage-roles" />
      <div className="p-4">
        <h2 className="text-3xl font-medium mb-4">Manage Role</h2>
        <div className="mb-4 grid grid-cols-2 gap-5">
          <div className="col-span-1">
            <label
              htmlFor="vendorSelect"
              className="block mb-2 font-medium text-gray-700"
            >
              Select User/Vendor
            </label>
            <select
              id="vendorSelect"
              className="w-full rounded-md border border-gray-300 p-2 mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedVendor ?? ""}
              onChange={(e) => setSelectedVendor(e.target.value)}
            >
              <option value="" disabled>
                Select a user/vendor
              </option>
              {userlist.map((vendor: any, index: any) => (
                <option key={index} value={vendor._id}>
                  {vendor?.email} ({vendor?.name})
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white ">
            <thead>
              <tr className="bg-blue-500 rounded-xl text-white overflow-hidden">
                <th className="px-4 py-2 text-lg font-medium text-left rounded-l-xl">
                  Permission
                </th>
                <th className="px-4 py-2 text-lg font-medium text-center">
                  Create
                </th>
                <th className="px-4 py-2 text-lg font-medium text-center">
                  Read
                </th>
                <th className="px-4 py-2 text-lg font-medium text-center">
                  Update
                </th>
                <th className="px-4 py-2 text-lg font-medium text-center rounded-r-xl">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {permissions.map((permission) => (
                <tr key={permission.name}>
                  <td className=" px-4 py-2 text-lg">{permission.name}</td>
                  {permission.crudRoles.map((role: string) => (
                    <td key={role} className="px-4 py-2 text-center">
                      {role ? (
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            checked={
                              crudPermissions[`${permission.name}-${role}`] ||
                              false
                            }
                            onChange={() =>
                              handleCheckboxChange(permission.name, role)
                            }
                            className="form-checkbox w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-opacity-50"
                          />
                        </label>
                      ) : (
                        "-"
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Save Permissions
        </button>
        <button
          onClick={() => navigate(-1)}
          className="bg-red-500 ml-2 text-white px-4 py-2 rounded mt-4"
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default ManageRoleForm;
