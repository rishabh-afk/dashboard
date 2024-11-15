import { toast, Id, TypeOptions } from "react-toastify";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // Default timeout in milliseconds
});

api.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("accessToken");
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const request = async <T>(
  config: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(),
    config.timeout || 10000,
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

// Update the toast with a cast to ensure proper ID typing
const handleToast = (
  id: Id,
  status: "loading" | "success" | "error",
  message: string,
) => {
  let toastType: TypeOptions = "default"; // Initialize to default

  if (status === "success") toastType = "success";
  else if (status === "error") toastType = "error";

  toast.update(id as string, {
    render: message,
    type: toastType, // Correctly assign the type here
    isLoading: status === "loading",
    autoClose: status !== "loading" ? 3000 : false, // Close only after success/error
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export const Fetch = async <T>(
  url: string,
  params?: object,
  timeout?: number,
): Promise<T> => {
  const toastId = toast.loading("Please wait...");
  try {
    const response = await request<T>({
      method: "GET",
      url,
      params,
      timeout,
    });
    handleToast(toastId, "success", "Fetched successfully!");
    return response.data;
  } catch (error: any) {
    handleToast(toastId, "error", error.message || "Failed to fetch data");
    throw error;
  }
};

export const Post = async <T>(
  url: string,
  data: object | FormData,
  timeout?: number,
): Promise<T> => {
  const toastId = toast.loading("Submitting data...");
  try {
    const response: any = await request<T>({
      method: "POST",
      url,
      data,
      timeout,
    });
    handleToast(
      toastId,
      "success",
      (response?.data?.message || response?.data?.error) ??
        "Submitted successfully!",
    );
    return response.data;
  } catch (error: any) {
    handleToast(toastId, "error", error.message || "Failed to submit data");
    throw error;
  }
};

export const Put = async <T>(
  url: string,
  data: object | FormData,
  timeout?: number,
): Promise<T> => {
  const toastId = toast.loading("Updating data...");
  try {
    const response = await request<T>({
      method: "PUT",
      url,
      data,
      timeout,
    });
    handleToast(toastId, "success", "Updated successfully!");
    return response.data;
  } catch (error: any) {
    handleToast(toastId, "error", error.message || "Failed to update data");
    throw error;
  }
};

// Add PATCH method
export const Patch = async <T>(
  url: string,
  data: object | FormData,
  timeout?: number,
): Promise<T> => {
  const toastId = toast.loading("Patching data...");
  try {
    const response = await request<T>({
      method: "PATCH",
      url,
      data,
      timeout,
    });
    handleToast(toastId, "success", "Patched successfully!");
    return response.data;
  } catch (error: any) {
    handleToast(toastId, "error", error.message || "Failed to patch data");
    throw error;
  }
};

export const Delete = async <T>(
  url: string,
  data?: object,
  params?: object,
  timeout?: number,
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
    handleToast(toastId, "success", "Deleted successfully!");
    return response.data;
  } catch (error: any) {
    handleToast(toastId, "error", error.message || "Failed to delete data");
    throw error;
  }
};
