import { contextApi } from "./CONTEXT";

const token = sessionStorage.getItem("authorization");

export const UserGet = async (id, page, size) => {
  try {
    const result = await contextApi(
      `/akun/${id}/user?page=${page}&size=${size}&sortField=id`,
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

export const UserEdit = async (id, rekeningId, action) => {
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
