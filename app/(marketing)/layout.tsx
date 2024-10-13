import HomePageHeader from "@/components/gloabal/Header";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex flex-col justify-start items-center gap-10">
      <HomePageHeader />
      <main>{children}</main>
    </div>
  );
};

export default layout;
