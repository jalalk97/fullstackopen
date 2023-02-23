import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = ({ error, token, onLogout }) => {
  return (
    <>
      <Header error={error} token={token} onLogout={onLogout} />
import Navigation from "./Navigation";

const Layout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};

export default Layout;
