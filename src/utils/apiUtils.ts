import { toast, Id, TypeOptions } from "react-toastify";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Define API base URL
const BASE_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // Default timeout in milliseconds
});

// Axios request interceptor for Authorization
api.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("accessToken");
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Helper function to make Axios requests
const request = async <T>(
  config: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(),
    config.timeout || 10000
  );

  try {
    // Handle multipart form data
    if (config.data instanceof FormData) {
      config.headers = {
        ...config.headers,
        "Content-Type": "multipart/form-data",
      };
    }

    const response = await api.request({
      ...config,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return response;
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (axios.isAxiosError(error) && error.message === "canceled") {
      throw new Error("Request aborted");
    } else {
      const status = error.response?.status;
      const message = error.response?.data?.message || error.message;
      throw new Error(`Error ${status}: ${message}`);
    }
  }
};

// Handle toast notifications
const handleToast = (
  id: Id | null,
  status: "loading" | "success" | "error",
  message: string,
  dismissToast: boolean
): void => {
  if (id === null) return;

  if (dismissToast) return toast.dismiss(id);

  let toastType: TypeOptions = "default";
  if (status === "success") toastType = "success";
  else if (status === "error") toastType = "error";

  toast.update(id, {
    render: message,
    type: toastType,
    isLoading: status === "loading",
    autoClose: status !== "loading" ? 3000 : false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

// Fetch utility function
export const Fetch = async <T>(
  url: string,
  params?: object,
  timeout?: number,
  dismissToast: boolean = false,
  showToast: boolean = true
): Promise<T> => {
  const toastId = showToast ? toast.loading("Please wait...") : null;

  try {
    const response = await request<T>({
      method: "GET",
      url,
      params,
      timeout,
    });
    handleToast(
      toastId,
      "success",
      (response?.data as { message?: string })?.message ??
        "Fetched successfully!",
      dismissToast
    );
    return response.data;
  } catch (error: any) {
    handleToast(
      toastId,
      "error",
      error.message || "Failed to fetch data",
      dismissToast
    );
    throw error;
  }
};

// Post utility function
export const Post = async <T>(
  url: string,
  data: object | FormData,
  timeout?: number,
  dismissToast: boolean = false
): Promise<T> => {
  const toastId = toast.loading("Submitting data...");

  try {
    const response = await request<T>({
      method: "POST",
      url,
      data,
      timeout,
    });
    handleToast(
      toastId,
      "success",
      (response?.data as { message?: string })?.message ??
        "Submitted successfully!",
      dismissToast
    );
    return response.data;
  } catch (error: any) {
    handleToast(
      toastId,
      "error",
      error.message || "Failed to submit data",
      dismissToast
    );
    throw error;
  }
};

// Put utility function
export const Put = async <T>(
  url: string,
  data: object | FormData,
  timeout?: number,
  dismissToast: boolean = false
): Promise<T> => {
  const toastId = toast.loading("Updating data...");

  try {
    const response = await request<T>({
      method: "PUT",
      url,
      data,
      timeout,
    });
    handleToast(
      toastId,
      "success",
      (response?.data as { message?: string })?.message ??
        "Updated successfully!",
      dismissToast
    );
    return response.data;
  } catch (error: any) {
    handleToast(
      toastId,
      "error",
      error.message || "Failed to update data",
      dismissToast
    );
    throw error;
  }
};

// Delete utility function
export const Delete = async <T>(
  url: string,
  data?: object,
  params?: object,
  timeout?: number,
  dismissToast: boolean = false
): Promise<T> => {
  const toastId = toast.loading("Deleting data...");

  try {
    const response = await request<T>({
      method: "DELETE",
      url,
      data,
      params,
      timeout,
    });
    handleToast(
      toastId,
      "success",
      (response?.data as { message?: string })?.message ??
        "Deleted successfully!",
      dismissToast
    );
    return response.data;
  } catch (error: any) {
    handleToast(
      toastId,
      "error",
      error.message || "Failed to delete data",
      dismissToast
    );
    throw error;
  }
};
