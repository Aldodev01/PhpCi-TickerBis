import { contextApi } from "./CONTEXT";

const token = sessionStorage.getItem("authorization");

export const SummarySeller = async (id, data) => {
  try {
    const result = await contextApi(`/summary/akun/${id}/transaksi/status`, {
      method: "POST",
      headers: {
        // "access-control-allow-origin" : "*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: data,
    });
    return result;
  } catch (error) {
    return error;
  }
};
