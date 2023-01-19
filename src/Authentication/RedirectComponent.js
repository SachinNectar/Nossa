import { AUTH_TOKEN, getCookie } from "./../../utils/cookie";
import React, { useEffect, useState } from "react";
import { getUserDetailsByToken } from "../../services/authentication";
import { showAlert } from "./../../utils/showAlert";
import { ROLE } from "./../../constants/authConstants";
import { useNavigate } from "react-router-dom";

export const RedirectComponent = () => {
  const [loading, setLoading] = useState({});

  const navigate = useNavigate();

  const getDataByToken = async () => {
    try {
      setLoading(true);
      const { result } = await getUserDetailsByToken();
      redirectUser(result);
    } catch (error) {
      showAlert("You are not authorized! Please try again.", "error");
      navigate("/auth/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataByToken();
  }, []);

  const redirectUser = (result) => {
    switch (result?.roles?.[0]) {
      case ROLE.FREELANCER:
        navigate(result?.profileComplete ? "" : "");
        return;

      case ROLE.CLIENT:
        navigate(
          result?.profileCompleted ? "/client/" : "/onboard/client"
        );
        return;

      default:
        navigate("/auth/login");
        return;
    }
  };

  if (loading) return <div>Loading...</div>;

  return null;
};
