import UserDetails from "../common/UserDetails";
import SearchBarForNavbar from "../common/SearchBarForNavbar";

const NavbarLayout = () => {
  return (
    <div className="w-[84%] bg-slate-200 fixed z-20 border-b-2 border-b-slate-200/80 flex justify-between items-center gap-5 p-3">
      <SearchBarForNavbar />
      <UserDetails />
    </div>
  );
};

export default NavbarLayout;
