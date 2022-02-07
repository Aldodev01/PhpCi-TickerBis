import { contextApi } from "./CONTEXT";

const token = sessionStorage.getItem("authorization");

export const AkunGetRekening = async (id) => {
  try {
    const result = await contextApi(
      `/akun/${id}/rekening?page=0&size=3&sortField=id`,
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

export const AkunEditRekening = async (id, rekeningId, action) => {
  try {
    const result = await contextApi(
      `/akun/${id}/rekening/${rekeningId}/default?isDefault=${action}`,
      {
        method: "PUT",
        headers: {
          // "access-control-allow-origin" : "*",
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      }
    );
    return result;
  } catch (error) {
    return error;
  }
};
