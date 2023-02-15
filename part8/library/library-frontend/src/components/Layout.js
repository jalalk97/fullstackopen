import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = ({ error, token, onLogout }) => {
  return (
    <>
      <Header error={error} token={token} onLogout={onLogout} />
      <Outlet />
    </>
  );
};
export default Layout;
