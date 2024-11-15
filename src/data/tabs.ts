import { FaStore } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { VscGraph } from "react-icons/vsc";
import { FaRegUser } from "react-icons/fa";
import { SiHelpdesk } from "react-icons/si";
import { VscPreview } from "react-icons/vsc";
import { RiHandbagLine } from "react-icons/ri";
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
    crudRoles: ["Read"],
    allowedRoles: ["admin"],
  },
  {
    id: 1,
    icon: VscGraph,
    name: "Statistics",
    title: "Statistics",
    href: "/statistics",
    crudRoles: ["Read"],
    allowedRoles: ["admin"],
  },
  {
    id: 2,
    href: "/users",
    icon: FaRegUser,
    name: "Manage Users",
    title: "User Management",
    allowedRoles: ["admin"],
    crudRoles: ["Read", "Create", "Edit", "Delete"],
  },
  {
    id: 3,
    href: "/products",
    title: "Products Management",
    icon: AiOutlineProduct,
    name: "Manage Products",
    allowedRoles: ["admin", "user"],
    crudRoles: ["Read", "Create", "Edit", "Delete"],
  },
  {
    id: 4,
    href: "/orders",
    icon: RiHandbagLine,
    name: "Manage Orders",
    title: "Order Management",
    crudRoles: ["Read"],
    allowedRoles: ["admin"],
  },
  {
    id: 8,
    href: "/stores",
    icon: FaStore,
    name: "Manage Stores",
    title: "Store Management",
    crudRoles: ["Read"],
    allowedRoles: ["admin"],
  },
  {
    id: 5,
    icon: MdPayment,
    href: "/payments",
    title: "Payments Management",
    name: "Manage Payments",
    crudRoles: ["Read", "Delete"],
    allowedRoles: ["admin", "user"],
  },
  {
    id: 6,
    href: "/reviews",
    icon: VscPreview,
    name: "Manage Reviews",
    allowedRoles: ["admin"],
    title: "Reviews Management",
    crudRoles: ["Read", "Create", "Edit", "Delete"],
  },
  {
    id: 7,
    href: "/manage-roles",
    icon: MdManageAccounts,
    name: "Manage Roles",
    allowedRoles: ["admin"],
    title: "Roles Management",
    crudRoles: ["Read", "Create", "Edit", "Delete"],
  },
  {
    id: 9,
    href: "/help-desk",
    icon: SiHelpdesk,
    name: "Help Desk",
    allowedRoles: ["admin"],
    title: "Help Desk",
    crudRoles: ["Read", "Create", "Edit", "Delete"],
  },
];
