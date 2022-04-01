import { contextApi } from "./CONTEXT";
const token = sessionStorage.getItem("authorization");

export const GetHookResi = async (id, resi) => {
  try {
    const result = await contextApi(`/hookaction/${id}/resi?resiId=${resi}`, {
      method: "GET",
      headers: {
        // "access-control-allow-origin" : "*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return result;
  } catch (error) {
    return error;
  }
};
