import React, { useState, useEffect } from "react";
import { getUserDetailsByToken } from "../../services/authentication";
import { useNavigate } from "react-router-dom";
import { showAlert } from "./../../utils/showAlert";
import { ROLE } from "./../../constants/authConstants";
import { ClientWrapper } from "./../../components/client/navigation/ClientWrapper";
import { useSelector } from "react-redux";

const useUserDetails = () => {
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState();
  const details = useSelector((state) => state.forms.useDetails);
  const navigate = useNavigate();

  const getDetails = async () => {
    try {
      setLoading(true);
      const data = await getUserDetailsByToken();
      console.log(data);
      setUserDetails(data.result);
    } catch (error) {
      showAlert("Unauthorized", "error");
      navigate("/auth/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (details) {
      setUserDetails(details);
      setLoading(false);
    } else {
      getDetails();
    }
  }, []);

  return { loading, userDetails };
};

export const ClientAuthRoute = (props) => {
  const { loading, userDetails } = useUserDetails();

  if (loading) return "Loading...";

  if (userDetails && userDetails?.roles?.[0] === ROLE.CLIENT) {
    return <ClientWrapper />;
  }

  return "Unauthorized";
};
