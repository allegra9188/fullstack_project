import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

import "./Root.less";
import SecondaryNav from "../features/SecondaryNav";

export default function Root() {
  return (
    <>
      <Navbar />
      <SecondaryNav />
      <main>
        <Outlet />
      </main>
    </>
  );
}
