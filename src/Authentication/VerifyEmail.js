import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { InputField } from "../../components/atoms/InputField";
import { createAccount, verifyEmail } from "../../services/authentication";
import { showAlert } from "../../utils/showAlert";

export default function VerifyEmail() {
  let { state } = useLocation();
  let { email } = state;
  let navigate = useNavigate();
  const [otp, setOtp] = useState();
  const [btnLoading, setBtnLoading] = useState();
  const [regenLoading, setRegenLoading] = useState();

  const value = {
    otp,
  };
  const enableBtn = otp;

  const verify = async () => {
    try {
      setBtnLoading(true);
      const data = {
        email,
        code: otp,
      };
      await verifyEmail(data);
      navigate("/auth/create-account", { state: data });
      showAlert("Email verification successfull.", "success");
    } catch (error) {
      console.log(error);
      showAlert(error.data.massage, "error");
    } finally {
      setBtnLoading(false);
    }
  };

  const regenerate = async () => {
    try {
      setRegenLoading(true);
      const data = { email };
      await createAccount(data);
      showAlert("Regenerated verification code.", "success");
    } catch (error) {
      showAlert(error.data.massage, "error");
    } finally {
      setRegenLoading(false);
    }
  };

  return (
    <div
      className="row justify-content-center "
      style={{ paddingTop: "12%", marginBottom: "12%" }}
    >
      <div className="col-md-5 form_login">
        <div className="text-center">
          <img src="/assets/images/logo.png" className="img-fluid" />
        </div>

        <h3 className="text-center mb-3">Validate Email ID</h3>

        <p className="text-info text-center">
          <strong>{email}</strong>
        </p>

        <p className="text-center font-weight-light">
          Please enter 6 digits verification code sent on your registered email
          id
        </p>
        <Form>
          <InputField
            id="otp"
            type="text"
            placeholder="Enter 6 digit code"
            value={value}
            handleChange={(e) => setOtp(e.target.value)}
          />

          <Button
            disabled={!enableBtn || btnLoading}
            variant="primary"
            className="w-100 blue_btn"
            size="lg"
            onClick={verify}
          >
            {btnLoading ? "Verifying...." : "Verify Email ID"}
          </Button>

          <p className="text-center mt-3 mb-0 font-weight-medium">
            <a onClick={regenerate} style={{cursor: "pointer"}}>
              <strong>
                {regenLoading ? "Regenerating..." : "Regenerate Code"}
              </strong>
            </a>
          </p>
        </Form>
      </div>
    </div>
  );
}
