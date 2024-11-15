import React from "react";
import EditUser from "../pages/users/EditUser";

const Users = React.lazy(() => import("../pages/Users"));
const Orders = React.lazy(() => import("../pages/Orders"));
const Reviews = React.lazy(() => import("../pages/Reviews"));
const Products = React.lazy(() => import("../pages/Products"));
const Payments = React.lazy(() => import("../pages/Payments"));
const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const Statistics = React.lazy(() => import("../pages/Statistics"));
const ManageRoles = React.lazy(() => import("../pages/ManageRoles"));
const ManageStores = React.lazy(() => import("../pages/ManageStores"));
const ManageHelpdesk = React.lazy(() => import("../pages/ManageHelpdesk"));

//  CRUD actions based routing
const ManageRoleForm = React.lazy(
  () => import("../pages/createEditPage/ManageRoleForm"),
);
const ManageReviewForm = React.lazy(
  () => import("../pages/createEditPage/ManageReviewForm"),
);
const ManageProductForm = React.lazy(
  () => import("../pages/createEditPage/ManageProductForm"),
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
];
