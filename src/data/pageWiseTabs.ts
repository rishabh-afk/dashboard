import { lazy } from "react";

const BankDetails = lazy(
  () => import("../components/users/businessDetails/BankDetails"),
);
const Details = lazy(
  () => import("../components/users/businessDetails/Details"),
);
const History = lazy(() => import("../components/users/orders/History"));
const Store = lazy(() => import("../components/users/orders/Store"));
const EditProfile = lazy(
  () => import("../components/users/personalDetails/EditProfile"),
);
const UpdatePassword = lazy(
  () => import("../components/users/personalDetails/UpdatePassword"),
);

export const pageWiseTabs = [
  {
    id: 1,
    label: "users",
    tabs: [
      { name: "Edit Profile", component: EditProfile, id: "edit-profile" },
      { name: "Password", component: UpdatePassword, id: "password" },
      { name: "History", component: History, id: "orders" },
      { name: "Store", component: Store, id: "store" },
      { name: "Bank Details", component: BankDetails, id: "bank-details" },
      { name: "Business Details", component: Details, id: "business-details" },
    ],
  },
];
