import axios from "axios";
import { generateBearerToken } from "../helpers/helpers";

const getAdminDashboardInformations = async () => {
  const apiBaseURL = window.API_BASE_URL;
  const bearerToken = generateBearerToken();
  const response = await axios.get(`${apiBaseURL}/admin/dashboard`, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
      Authorization: bearerToken,
    },
  });

  return response.status === 200 ? response.data : null;
};

export { getAdminDashboardInformations };
