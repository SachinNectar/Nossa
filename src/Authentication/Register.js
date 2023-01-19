import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { InputField } from "../../components/atoms/InputField";
import { isValidEmail } from "../../utils/validators";
import { showAlert } from "../../utils/showAlert";
import { createAccount } from "../../services/authentication";

export default function Register() {
  let navigate = useNavigate();
  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState();
  const [btnLoading, setBtnLoading] = useState();

  const value = {
    email,
    validation: {
      email: emailError,
    },
  };
  const enableBtn = email;
  const register = async () => {
    setEmailError("");
    if (!isValidEmail(email)) {
      setEmailError("Email is not valid.");
      return;
    }
    try {
      setBtnLoading(true);
      const data = { email };
      await createAccount(data);
      navigate("/auth/verify-email", { state: data });
      showAlert("Email verification code generated.", "success");
    } catch (error) {
      showAlert(error.data.massage, "error");
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div
      className="row justify-content-center "
      style={{ paddingTop: "6%", marginBottom: "6%" }}
    >
      <div className="col-md-5 form_login">
        <div className="text-center">
          <img src="/assets/images/logo.png" className="img-fluid" />
        </div>

        <h3 className="text-center mb-3">Create your free Account</h3>
        <Form>
          <InputField
            id="email"
            type="email"
            placeholder="Email Address"
            value={value}
            handleChange={(e) => setEmail(e.target.value)}
          />

          <Button
            disabled={!enableBtn || btnLoading}
            variant="primary"
            className="w-100 blue_btn"
            size="lg"
            onClick={register}
          >
            {btnLoading ? "Processing...." : "Continue with Email ID"}
          </Button>

          <div className="login-or">
            <hr className="hr-or" />
            <span className="span-or">OR</span>
          </div>

          <div className="w-100 login-socaillinks">
            <a href="#" className="facbook">
              <i className="fab fa-facebook-f fa-2x"></i> Sign up with Facebook
            </a>

            <a href="#" className="google">
              <i className="fab fa-google fa-2x"></i> Sign up with Google
            </a>

            <a href="#" className="linkedin">
              <i className="fab fa-linkedin-in fa-2x"></i> Sign up with Linkedin
            </a>
          </div>

          <p className="text-center mb-0 font-weight-normal">
            Already have an account?
            <Link to="/auth/login" className="font-weight-medium">
              <strong>Log In</strong>
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
}
