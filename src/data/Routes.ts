import React from "react";
import EditUser from "../pages/users/EditUser";
import Categories from "../pages/category/Categories";
import SCategories from "../pages/category/SUBCategories";
import EditInventory from "../pages/inventory/EditInventory";
import UpdateInventory from "../pages/inventory/UpdateInventory";

const Users = React.lazy(() => import("../pages/Users"));
const Orders = React.lazy(() => import("../pages/Orders"));
const Reviews = React.lazy(() => import("../pages/Reviews"));
const Products = React.lazy(() => import("../pages/Products"));
const Payments = React.lazy(() => import("../pages/Payments"));
const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const Statistics = React.lazy(() => import("../pages/Statistics"));
const ManageRoles = React.lazy(() => import("../pages/ManageRoles"));
const ManageStores = React.lazy(() => import("../pages/ManageStores"));
const ManageCoupons = React.lazy(() => import("../pages/ManageCoupons"));
const ManageHelpdesk = React.lazy(() => import("../pages/ManageHelpdesk"));
const EditHelpDesk = React.lazy(() => import("../pages/EditHelpDeskUser"));

//  CRUD actions based routing
const ManageRoleForm = React.lazy(
  () => import("../pages/createEditPage/ManageRoleForm")
);
const ManageReviewForm = React.lazy(
  () => import("../pages/createEditPage/ManageReviewForm")
);
const ManageProductForm = React.lazy(
  () => import("../pages/createEditPage/ManageProductForm")
);
const ManageAgents = React.lazy(() => import("../pages/category/ManageAgents"));
const ManageCouponForm = React.lazy(
  () => import("../pages/coupon/ManageCouponForm")
);

export const routes = [
  {
    path: "/dashboard",
    component: Dashboard,
    requiredPermission: "View Dashboard",
  },
  {
    path: "/statistics",
    component: Statistics,
    requiredPermission: "Statistics",
  },
  {
    path: "/orders",
    component: Orders,
    requiredPermission: "Manage Orders",
  },
  {
    path: "/products",
    component: Products,
    requiredPermission: "Manage Products",
  },
  {
    path: "/reviews",
    component: Reviews,
    requiredPermission: "Manage Reviews",
  },
  {
    path: "/users",
    component: Users,
    requiredPermission: "Manage Users",
  },
  {
    path: "/payments",
    component: Payments,
    requiredPermission: "Manage Payments",
  },
  {
    path: "/manage-roles",
    component: ManageRoles,
    requiredPermission: "Manage Roles",
  },
  {
    path: "/stores",
    component: ManageStores,
    requiredPermission: "Manage Stores",
  },
  {
    path: "/help-desk",
    component: ManageHelpdesk,
    requiredPermission: "Help Desk",
  },
  {
    path: "/coupons",
    component: ManageCoupons,
    requiredPermission: "Manage Coupons",
  },
];

export const crudBasedRoutes = [
  {
    type: "Create",
    component: ManageRoleForm,
    path: "/manage-roles/create-role",
    requiredPermission: "Manage Roles",
  },
  {
    type: "Create",
    component: ManageReviewForm,
    path: "/reviews/create-review",
    requiredPermission: "Manage Reviews",
  },
  {
    type: "Edit",
    component: ManageReviewForm,
    path: "/reviews/edit-review/:id",
    requiredPermission: "Manage Reviews",
  },
  {
    type: "Create",
    component: ManageProductForm,
    path: "/products/create-product",
    requiredPermission: "Manage Products",
  },
  {
    type: "Edit",
    component: ManageProductForm,
    path: "/products/edit-product/:id",
    requiredPermission: "Manage Products",
  },
  {
    type: "Edit",
    component: ManageRoleForm,
    path: "/manage-roles/edit-role/:id",
    requiredPermission: "Manage Roles",
  },
  {
    type: "Create",
    component: EditUser,
    path: "/users/create-user",
    requiredPermission: "Manage Users",
  },
  {
    type: "Edit",
    component: EditUser,
    path: "/users/edit-user/:id",
    requiredPermission: "Manage Users",
  },
  {
    type: "Edit",
    component: EditHelpDesk,
    path: "/help-desk/view-ticket/:id",
    requiredPermission: "Help Desk",
  },
  {
    type: "Create",
    component: ManageAgents,
    path: "/help-desk/manage-agent",
    requiredPermission: "Help Desk",
  },
  {
    type: "Edit",
    component: EditInventory,
    path: "/manage-inventory/:id",
    requiredPermission: "Manage Products",
  },
  {
    type: "Create",
    component: UpdateInventory,
    path: "/manage-inventory/create-inventory",
    requiredPermission: "Manage Products",
  },
  {
    type: "Edit",
    component: Categories,
    path: "/products/categories",
    requiredPermission: "Manage Products",
  },
  {
    type: "Edit",
    component: SCategories,
    path: "/products/sub-categories",
    requiredPermission: "Manage Products",
  },
  {
    type: "Edit",
    component: UpdateInventory,
    path: "/manage-inventory/edit-inventory/:inventoryId",
    requiredPermission: "Manage Products",
  },
  {
    type: "Create",
    component: ManageCouponForm,
    path: "/coupons/create-coupon",
    requiredPermission: "Manage Coupons",
  },
  {
    type: "Edit",
    component: ManageCouponForm,
    path: "/coupons/edit-coupon/:couponId",
    requiredPermission: "Manage Coupons",
  },
];
