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

export const GetLocation = async (keyword) => {
  try {
    const result = await contextApi(
      `/ekspedisi/lokasi?by=kodePos&keyword=${keyword}&page=0&size=50&sortBy=id`,
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

export const GetLocationByQuery = async (key) => {
  try {
    const result = await contextApi(
      `/ekspedisi/lokasi?by=kodePos&keyword=${key.queryKey[1]}&page=0&size=50&sortBy=id`,
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
export const GetPriceLocation = async (
  berat,
  kecamatanAsal,
  kecamatanTujuan,
  kodePosAsal,
  kodePosTujuan
) => {
  try {
    const result = await contextApi(
      `/pengiriman/9a3ec075-649c-4c70-82d5-9a56abc1d805/tarif/jne/kodepos/kecamatan?berat=${berat}&kecamatanAsal=${kecamatanAsal}&kecamatanTujuan=${kecamatanTujuan}&kodeposAsal=${kodePosAsal}&kodeposTujuan=${kodePosTujuan}&layananPaket=REG`,
      {
        method: "POST",
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
