// import { FaStore } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { VscGraph } from "react-icons/vsc";
import { FaRegUser } from "react-icons/fa";
import { RiSeoFill } from "react-icons/ri";
import { SiHelpdesk } from "react-icons/si";
import { FaBloggerB } from "react-icons/fa6";
import { VscPreview } from "react-icons/vsc";
// import { RiHandbagLine } from "react-icons/ri";
import { RiDashboardLine } from "react-icons/ri";
import { AiOutlineProduct } from "react-icons/ai";
import { MdManageAccounts } from "react-icons/md";

export const tabs = [
  {
    id: 0,
    title: "Dashboard",
    href: "/dashboard",
    icon: RiDashboardLine,
    name: "View Dashboard",
    crudRoles: ["", "Read", "", ""],
    allowedRoles: ["admin"],
  },
  {
    id: 1,
    icon: VscGraph,
    name: "Statistics",
    title: "Statistics",
    href: "/statistics",
    crudRoles: ["", "Read", "", ""],
    allowedRoles: ["admin"],
  },
  {
    id: 2,
    href: "/users",
    icon: FaRegUser,
    name: "Manage Users",
    title: "User Management",
    allowedRoles: ["admin"],
    crudRoles: ["Create", "Read", "Edit", "Delete"],
  },
  {
    id: 3,
    href: "/products",
    title: "Products Management",
    icon: AiOutlineProduct,
    name: "Manage Products",
    allowedRoles: ["admin", "vendor"],
    crudRoles: ["Create", "Read", "Edit", "Delete"],
  },
  // {
  //   id: 4,
  //   href: "/orders",
  //   icon: RiHandbagLine,
  //   name: "Manage Orders",
  //   title: "Order Management",
  //   crudRoles: ["", "Read", "", ""],
  //   allowedRoles: ["admin"],
  // },
  // {
  //   id: 8,
  //   href: "/stores",
  //   icon: FaStore,
  //   name: "Manage Stores",
  //   title: "Store Management",
  //   crudRoles: ["", "Read", "", ""],
  //   allowedRoles: ["admin"],
  // },
  // {
  //   id: 5,
  //   icon: MdPayment,
  //   href: "/payments",
  //   title: "Payments Management",
  //   name: "Manage Payments",
  //   crudRoles: ["", "Read", "", "Delete"],
  //   allowedRoles: ["admin", "user"],
  // },
  {
    id: 6,
    href: "/reviews",
    icon: VscPreview,
    name: "Manage Reviews",
    allowedRoles: ["admin"],
    title: "Reviews Management",
    crudRoles: ["Create", "Read", "Edit", "Delete"],
  },
  {
    id: 7,
    href: "/manage-roles",
    icon: MdManageAccounts,
    name: "Manage Roles",
    allowedRoles: ["admin"],
    title: "Roles Management",
    crudRoles: ["Create", "Read", "Edit", "Delete"],
  },
  {
    id: 10,
    icon: MdPayment,
    href: "/coupons",
    title: "Manage Coupons",
    name: "Manage Coupons",
    crudRoles: ["Create", "Read", "Edit", "Delete"],
    allowedRoles: ["admin", "vendor", "sub-admin"],
  },
  {
    id: 9,
    href: "/help-desk",
    icon: SiHelpdesk,
    name: "Help Desk",
    allowedRoles: ["admin", "vendor"],
    title: "Help Desk",
    crudRoles: ["Create", "Read", "Edit", "Delete"],
  },
  {
    id: 11,
    href: "/seo",
    icon: RiSeoFill,
    name: "SEO (Meta Data)",
    allowedRoles: ["admin", "vendor"],
    title: "Search Engine Optimization",
    crudRoles: ["Create", "Read", "Edit", "Delete"],
  },
  {
    id: 12,
    href: "/blogs",
    icon: FaBloggerB,
    name: "Manage Blogs",
    title: "Manage Blogs",
    allowedRoles: ["admin", "vendor"],
    crudRoles: ["Create", "Read", "Edit", "Delete"],
  },
];
