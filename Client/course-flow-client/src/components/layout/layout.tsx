import { Outlet } from "react-router";
import HeaderPage from "../pages/header";
import FooterPage from "../pages/footer";
export default function Layout() {
  return (
    <>
      <HeaderPage />
      <Outlet />
      <FooterPage />
    </>
  );
}
