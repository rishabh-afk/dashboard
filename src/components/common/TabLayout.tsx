import Back from "./Back";
import UnderMaintainance from "./UnderMaintainance";
import { useState, useCallback, useMemo } from "react";
import { pageWiseTabs } from "../../data/pageWiseTabs";

const TabLayout = ({ screen }: { screen: string }) => {
  const tabs = useMemo(() => {
    return pageWiseTabs.find((tab) => tab.label === screen)?.tabs ?? [];
  }, [screen]);
  const [activeTabId, setActiveTabId] = useState<string>(tabs[0]?.id ?? "");

  const handleTabClick = useCallback((tabId: string) => {
    setActiveTabId(tabId);
  }, []);

  const ActiveComponent = useMemo(() => {
    const activeTab = tabs.find((tab) => tab.id === activeTabId);
    return activeTab ? activeTab.component : null;
  }, [activeTabId, tabs]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Back />
      <div className="p-4 bg-white shadow-lg rounded-2xl m-4 transition-all duration-300">
        <div className="flex border-t border-primary/20 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`relative py-2 px-4 focus:outline-none transition-colors duration-200 ${
                activeTabId === tab.id ? `text-primary` : "text-gray-500"
              }`}
              onClick={() => handleTabClick(tab.id)}
              aria-selected={activeTabId === tab.id}
              role="tab"
            >
              {tab.name}
              {activeTabId === tab.id && (
                <span
                  className="absolute left-0 top-0 w-full h-full bg-gradient-to-b border-t-2 border-primary/70 from-primary/20 via-primary/10 to-primary/5 animate-slide"
                  style={{ transition: "width 0.3s ease" }}
                />
              )}
            </button>
          ))}
        </div>
        <div className="mt-4 min-h-[70vh]">
          {ActiveComponent ? <ActiveComponent /> : <UnderMaintainance />}
        </div>
      </div>
    </div>
  );
};

export default TabLayout;
