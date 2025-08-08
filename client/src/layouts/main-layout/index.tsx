import { Outlet, useLocation } from "react-router-dom";

// components
import { MainLayoutSidebar } from "@/layouts/main-layout/components/shared/main-layout-sidebar";
import { MainLayoutSearchSuggestions } from "@/layouts/main-layout/components/shared/main-layout-search-suggestions";

export function MainLayout() {
  const location = useLocation();

  return (
    <main className="h-screen w-full">
      <div className="relative mx-auto flex h-full max-w-5xl border-x">
        {/* Left Sidebar */}
        <MainLayoutSidebar />

        {/* Center Feed */}
        <div className="h-full flex-1 overflow-y-auto border-r">
          <div className="bg-background sticky top-0 flex h-14 items-center justify-center border-b">
            <h2 className="text-sm font-bold capitalize">
              {location.pathname === "/"
                ? "Daak"
                : location.pathname.split("/")}
            </h2>
          </div>
          <div className="p-2.5 sm:p-4">
            <Outlet />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="hidden h-full flex-[0.65] shrink-0 overflow-y-auto p-2.5 sm:p-4 md:block">
          <MainLayoutSearchSuggestions />
        </div>
      </div>
    </main>
  );
}
