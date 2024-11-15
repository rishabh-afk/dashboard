import React from "react";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import NavbarLayout from "./NavbarLayout";

interface LayoutProps {
  children: React.ReactNode; // React node as children
  hideTopBottom?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideTopBottom }) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex flex-grow">
        <Sidebar />
        <div className="flex flex-col w-full">
          {!hideTopBottom && <NavbarLayout />}
          <main className="flex-grow overflow-y-scroll h-96">
            {children}
            {!hideTopBottom && <Footer />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
