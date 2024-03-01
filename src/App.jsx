import { Routes, Route, NavLink } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { STTemp } from "./pages/STTemp";
import { STSaved } from "./pages/STSaved";
import { AdminPage } from "./pages/AdminPage";
import { AboutPage } from "./pages/AboutPage";
import { Docs } from "./pages/Docs";
//import { UploadImagePage } from "./pages/UploadImagePage";
import { Authentication } from "./components/Authentication";
import { useAuth } from "./hooks/useAuth";
import { dbUrl } from "./pocketbase";

function styleLink({ isActive }) {
  if (isActive) return "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800";
  return "p-2 hover:text-blue-600";
}

export default function App() {
  const { isAdmin } = useAuth();
  return (
    <div className="h-screen bg-white dark:bg-gray-800 text-black dark:text-white">
      <div className="bg-white border-b-8 border-blue-600 flex items-center px-4 dark:bg-gray-800">
        <div className="text-xl font-medium me-auto">DraftApp</div>

        <div className="flex p-3 text-font-center">
          <NavLink className={styleLink} to={"/"}>
            Home
          </NavLink>
          <NavLink className={styleLink} to="/Docs">
            My Documents
          </NavLink>
          <NavLink className={styleLink} to="/STSaved">
            New Document
          </NavLink>
        </div>

        <Authentication className="flex items-center gap-2 ms-auto" />
      </div>

      <div className="mx-auto flex w-4/6 pb-10 justify-center">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/About" element={<AboutPage />} />
          <Route path="/Docs" element={<Docs />} />
          <Route path="/STTemp" element={<STTemp />} />
          <Route path="/STSaved" element={<STSaved />} />
        </Routes>
      </div>

      <footer className="w-full my-3 text-center text-black">
        {dbUrl && (
          <h6>DraftApp V2 2024</h6>
        )}
      </footer>
    </div>
  );
}
