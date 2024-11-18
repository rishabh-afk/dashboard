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
  Inventory: {
    create: "inventory/create",
    read: "inventory/get/",
    update: `inventory/edit/`,
    delete: "inventory/delete/",
    fetchAll: "inventory/get-by-product?productId=",
  },
  Categories: {
    create: "categories/store",
    read: "categories/get/",
    update: `categories/update/`,
    delete: "categories/delete/",
    fetchAll: "categories/all",
  },
  SCategories: {
    create: "subcategories/store",
    read: "subcategories/get/",
    update: `subcategories/update/`,
    delete: "subcategories/delete/",
    fetchAll: "subcategories/all",
  },
  Coupons: {
    all: "/coupons",
    create: "coupon/create",
    read: "coupon/get-by-id/",
    update: `coupon/update/`,
    delete: "coupon/delete/",
    fetchAll: "coupon/list",
    redirectUrl: "/coupons/edit-coupon/",
  },
  SEO: {
    all: "/seo",
    create: "seo/create",
    read: "seo/get-by-id/",
    update: `seo/update/`,
    delete: "seo/delete/",
    fetchAll: "seo/list",
    redirectUrl: "/seo/edit-seo/",
  },
  Blogs: {
    all: "/blogs",
    create: "blogs/create",
    read: "blogs/get-by-id/",
    update: `blogs/update/`,
    delete: "blogs/delete/",
    fetchAll: "blogs/list",
    redirectUrl: "/blogs/edit-blog/",
  },
  Products: {
    all: "/products",
    create: "products/add",
    read: "products/get/",
    update: `products/edit/`,
    delete: "products/delete/",
    fetchAll: "products/get-all",
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
  HelpDesk: {
    create: "",
    update: "",
    all: "/help-desk",
    read: "ticket/tickets/",
    delete: "ticket/tickets/",
    fetchAll: "ticket/tickets",
    redirectUrl: "/help-desk/view-ticket/",
  },
  HelpDeskAgent: {
    redirectUrl: "",
    all: "/help-desk",
    read: "ticket/get-agent/",
    fetchAll: "ticket/agents",
    update: "ticket/update-agent",
    delete: "ticket/delete-agent/",
    create: "ticket/create-agent",
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
