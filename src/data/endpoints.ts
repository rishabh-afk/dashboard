export const endpoints: Record<
  string,
  {
    read: string;
    create: string;
    update: string;
    delete: string;
    fetchAll: string;
    redirectUrl?: any;
    all?: any;
  }
> = {
  Reviews: {
    create: "ratings/store",
    read: "ratings/publish/",
    update: `ratings/publish/`,
    delete: "ratings/delete/",
    fetchAll: "ratings/all",
  },
  Products: {
    create: "products/store",
    read: "products/product/",
    update: `products/publish/`,
    delete: "products/product/",
    fetchAll: "products/product",
    redirectUrl: "/products/edit-product/",
  },
  Users: {
    all: "/users",
    create: "vendors",
    update: `vendors/`,
    delete: "vendors/",
    fetchAll: "vendors",
    read: "vendors/get/",
    redirectUrl: "/users/edit-user/",
  },
  Permissions: {
    all: "/manage-roles",
    create: "vendors",
    update: `vendors/`,
    delete: "vendors/",
    fetchAll: "vendors",
    read: "vendors/get/",
    redirectUrl: "/manage-roles/edit-role/",
  },
};
