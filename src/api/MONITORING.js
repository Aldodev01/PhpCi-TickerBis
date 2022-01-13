import { contextApi } from "./CONTEXT";

const token = localStorage.getItem("token");

export const MonitoringTable = async (id, data) => {
  try {
    const result = await contextApi(`/akun/${id}/monitoring`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorizaton: `Bearer ${token}`,
      },
      data: data,
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const PickupLocation = async (id) => {
  try {
    const result = await contextApi(
      `akun/${id}/pickup?page=0&size=3&sortField=id`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorizaton: `Bearer ${token}`,
        },
      }
    );
    return result;
  } catch (error) {
    return error;
  }
};
