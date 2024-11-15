import { useLocation } from "react-router-dom";
import { tabs } from "../../data/tabs";

const Navbar = () => {
  const { pathname } = useLocation();
  const title = tabs.filter((tab: { href: string }) => tab.href === pathname)[0]
    ?.title;
  return (
    <header className="bg-blue-600 text-white p-4">
      <h1 className="text-xl">{title}</h1>
    </header>
  );
};

export default Navbar;
