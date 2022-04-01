import { contextApi } from "./CONTEXT";

const token = sessionStorage.getItem("authorization");
export const GetDetailSettlement = async (id) => {
  try {
    const result = await contextApi(`/finance/settlement/detail/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const GetSettlement = async (id, expeditionId, keyword, page, size) => {
  try {
    const result = await contextApi(
      `/finance/${id}/settlement?ekspedisiId=${expeditionId}&keyword=${keyword}&page=${page}&size=${size}&sortField=id`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const GetSettlementByDate = async (
  id,
  expeditionId,
  keyword,
  page,
  size,
  dateEnd,
  dateStart
) => {
  try {
    const result = await contextApi(
      `/finance/${id}/settlement?ekspedisiId=${expeditionId}&keyword=${keyword}&page=${page}&size=${size}&sortField=id&tglAkhir=${dateEnd}&tglAwal=${dateStart}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const GetSettlementBySelect = async (id, data) => {
  try {
    const result = await contextApi(`/akun/${id}/finance/detail/ref`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: data,
    });
    return result;
  } catch (error) {
    return error;
  }
};
