import React from "react";
import { Outlet } from "react-router-dom";
import AuthFooter from "./AuthFooter";

function AuthTemplate({ children, bgClass }) {
  return (
    <div className={bgClass}>
      <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <main>
            <div className="container ">
              <Outlet />
            </div>
          </main>
        </div>
        <AuthFooter />
      </div>
    </div>
  );
}

export default AuthTemplate;
