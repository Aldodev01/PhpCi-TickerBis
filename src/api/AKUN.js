import { contextApi } from "./CONTEXT";

const token = sessionStorage.getItem("authorization");

/**
 * Kumpulan fungsi-fungsi untuk mengakses API Akun REKENING
 * ====================================================
 * @param {Function} AkunRekenning  - Akun - Rekening
 */

export const AkunGetRekening = async (id) => {
  try {
    const result = await contextApi(
      `/akun/${id}/rekening?page=0&size=99&sortField=id`,
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

export const AkunDeleteRekening = async (id, rekeningId, action) => {
  try {
    const result = await contextApi(`/akun/${id}/rekening/${rekeningId}`, {
      method: "DELETE",
      headers: {
        // "access-control-allow-origin" : "*",
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const AkunCreateRekening = async (id, data) => {
  try {
    const result = await contextApi(`/akun/${id}/rekening`, {
      method: "POST",
      headers: {
        // "access-control-allow-origin" : "*",
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
      data: data,
    });
    return result;
  } catch (error) {
    return error;
  }
};

/**
 * Kumpulan fungsi-fungsi untuk mengakses API Akun Transaksi
 * ====================================================
 * @param {Function} AkunTransaksi  - Akun - Transaksi
 */
export const AkunGetTransaction = async (id, awb) => {
  try {
    const result = await contextApi(`/akun/${id}/resi?resiId=${awb}`, {
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

export const AkunCreateAddress = async (id, data) => {
  try {
    const result = await contextApi(`/akun/${id}/pickup`, {
      method: "POST",
      headers: {
        // "access-control-allow-origin" : "*",
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
      data: data,
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const AkunDeleteAddress = async (id, pickupId) => {
  try {
    const result = await contextApi(`/akun/${id}/pickup/${pickupId}`, {
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
