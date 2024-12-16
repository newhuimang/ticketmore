import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="relative w-screen min-h-screen">
      <main>
        <Outlet />
      </main>
    </div>
  );
}
