import { contextApi } from "./CONTEXT";

const token = sessionStorage.getItem("authorization");

export const PickupGet = async (id, size) => {
  try {
    const result = await contextApi(
      `akun/${id}/pickup?page=0&size=${size}&sortField=id`,
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

export const PickupPut = async (id, addressId, action) => {
  try {
    const result = await contextApi(
      `/akun/${id}/pickup/${addressId}/default?isDefault=${action}`,
      {
        method: "PUT",
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

export const PickupDelete = async (id, addressId) => {
  try {
    const result = await contextApi(`/akun/${id}/pickup/${addressId}`, {
      method: "DELETE",
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
