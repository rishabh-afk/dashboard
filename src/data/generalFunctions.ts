import { assign, includes } from "../utils/polyfills";
import { tabs } from "./tabs";

interface Permission {
  name: string;
  crudRoles: string[];
}

export const convertPermissions = (
  permissions: Record<string, boolean>
): Permission[] => {
  const reformattedPermissions: Record<
    string,
    { name: string; crudRoles: string[] }
  > = {};

  for (const key in permissions) {
    const [name, role] = key.split("-");

    if (!reformattedPermissions[name]) {
      reformattedPermissions[name] = {
        name: name,
        crudRoles: [],
      };
    }
    if (
      permissions[key] &&
      includes(["Read", "Create", "Edit", "Delete"], role)
    )
      reformattedPermissions[name].crudRoles.push(role);
  }
  return Object.values(reformattedPermissions).filter(
    (permission) => permission.crudRoles.length > 0
  );
};
export const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout | null = null;
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const isButtonAllowedToShow = (
  type: string,
  currentPage: string,
  allowedTabs: any
) => {
  const currentTab: any = allowedTabs.find(
    (tab: any) => tab?.name === currentPage
  );
  return currentTab ? includes(currentTab.crudRoles, type) : false;
};

export const populateFormFields = (fields: any, product: any) => {
  return fields.map((field: any) => {
    if (product.hasOwnProperty(field.name))
      return { ...field, value: product[field.name] };
    return field;
  });
};

export const populateFormData = (fields: any, product: any) => {
  const object = {};
  // eslint-disable-next-line
  fields.map((field: any) => {
    if (product.hasOwnProperty(field.name)) {
      assign(object, { [field.name]: product[field.name] });
    }
  });
  return object;
};
export function formatDate(inputDate: any) {
  const date = new Date(inputDate);

  // Get the year, month, and day
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
  const day = String(date.getDate()).padStart(2, "0"); // Pad single digit days with a leading zero

  // Return in YYYY-MM-DD format
  return `${year}-${month}-${day}`;
}

export const getSelectFormattedData = (data: any) => {
  const response = data.map((option: any) => ({
    value: option?.name,
    label: option?._id,
  }));
  return response;
};

export const getUrl = (data: any) => {
  if (data.length === 0) return "/not-allowed";
  for (const tab of tabs) {
    for (const item of data) {
      if (tab.name === item.name) return tab.href;
    }
  }
  return "/not-allowed";
};
