import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ResetSuccess() {
  let navigate = useNavigate();
  return (
    <div
      className="row justify-content-center "
      style={{ paddingTop: "18%", paddingBottom: "18%" }}
    >
      <div className="col-md-4 form_login">
        <div className="text-center">
          <img src="/assets/images/check.png" style={{ width: "75px" }} />
        </div>

        <h3 className="text-center mb-3">Password Reset Successfully</h3>

        <div className="w-100">
          <button
            className="btn btn-info btn-block btn-lg"
            onClick={() => navigate("/auth/login")}
          >
            Login Now
          </button>
        </div>
      </div>
    </div>
  );
}
