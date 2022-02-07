import { contextApi } from "./CONTEXT";

const token = sessionStorage.getItem("authorization");

export const ExpeditionGet = async () => {
  try {
    const result = await contextApi(
      "/pengiriman/ekspedisi?page=0&size=100&sortField=id",
      {
        method: "GET",
        headers: {
          // "access-control-allow-origin" : "*",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    return result;
  } catch (error) {
    return error;
  }
};
