import { tabs } from "../../data/tabs";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();
  const user = useSelector((state: RootState) => state.auth.user);
  const allowedRolesPerAdmin = user?.allowedTabs;

  const allowedTabs = tabs.filter(
    (tab: { allowedRoles: string[]; name: string }) => {
      return allowedRolesPerAdmin?.some((roleDb: any) => {
        return tab.name === roleDb.name && roleDb.crudRoles.length > 0;
      });
    }
  );
  return (
    <div className="w-1/5 max-w-[18%] flex flex-col justify-start items-start bg-primary text-white">
      <span className="flex justify-center items-center w-full text-xl py-4 border-b">
        Dashboard
      </span>
      <div className="overflow-y-scroll hide-scrollbar max-h-screen pb-20">
        {allowedTabs?.map((tab: any) => {
          const Icon = tab?.icon;
          return (
            <Link
              key={tab?.id}
              to={tab?.href}
              preventScrollReset={true}
              className={`${
                pathname === tab?.href
                  ? "bg-gradient-to-r"
                  : "hover:bg-gradient-to-r"
              } cursor-pointer text-sm inline-flex gap-3 w-full py-3 pl-6 items-center from-[#78A1DE] via-[#78A1DE] to-[#78A1DE]`}
            >
              <span>
                <Icon size={17} />
              </span>
              {tab.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
