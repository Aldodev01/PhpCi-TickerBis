import { contextApi } from "./CONTEXT";

const token = sessionStorage.getItem("authorization");

export const GetTrackingHistory = async (expedisi, awb) => {
  try {
    const result = await contextApi(`/pengiriman/${expedisi}/resi/${awb}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const GetShippingCost = async (
  id,
  berat,
  destination,
  origin,
  layananPaket
) => {
  try {
    const result = await contextApi(
      `/pengiriman/${id}/tarif/jne/?berat=${berat}&destinationId=${destination}&layananPaket=${layananPaket}&originId=${origin}`,
      {
        method: "POST",
        headers: {
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

export const GetAddressFrom = async (id) => {
  try {
    const result = await contextApi(
      `/pengiriman/${id}/pickup?page=0&size=100000&sortField=id`,
      {
        method: "GET",
        headers: {
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

export const CreateTransaction = async (id, data, type) => {
  if (type === "COD") {
    try {
      const result = await contextApi(`/pengiriman/${id}/input/transaksi`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        data: data,
      });
      return result;
    } catch (error) {
      return error;
    }
  } else {
    try {
      const result = await contextApi(
        `/pengiriman/${id}/input/transaksi/noncod`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          data: data,
        }
      );
      return result;
    } catch (error) {
      return error;
    }
  }
};
