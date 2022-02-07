import { contextApi } from "./CONTEXT";

const token = sessionStorage.getItem("authorization");

export const MonitoringTable = async (key) => {
  try {
    const result = await contextApi(`/akun/${key.queryKey[1]}/monitoring`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: key.queryKey[2],
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
          Authorization: "Bearer " + token,
        },
      }
    );
    return result;
  } catch (error) {
    return error;
  }
};
