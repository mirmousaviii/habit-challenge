import { ReactNode } from "react";
import { useAuth } from "@hooks/useAuth";
import { APP_NAME } from "@modules/core";

const Layout = ({ children }: { children: ReactNode }) => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-indigo-600">{APP_NAME || "Habit Challenge"}</h1>
          <button
            onClick={logout}
            className="bg-danger hover:bg-danger-dark text-white px-4 py-1.5 rounded text-sm"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="flex-grow max-w-3xl w-full px-4 py-6 mx-auto">
        {children}
      </main>
      <footer className="bg-white text-slate-500 text-center text-sm py-4 border-t border-slate-200">
        &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
