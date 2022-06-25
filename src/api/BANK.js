import { contextApi } from "./CONTEXT";

const token = sessionStorage.getItem("authorization");

export const GetBank = async () => {
  try {
    const result = await contextApi(
      "/akun/rekening/bank?page=0&size=100000&sortField=kodeBank",
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
