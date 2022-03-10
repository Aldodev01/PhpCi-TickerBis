import { contextApi } from "./CONTEXT";

const token = sessionStorage.getItem("authorization");

export const GetOrderHistory = async (id, page, size, keyword) => {
  try {
    const result = await contextApi(
      `/akun/${id}/order/history/batch?page=${page}&size=${size}&keyword=${keyword}&sortField=createdDate`,
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

export const GetOrderHistoryByDate = async (
  id,
  page,
  size,
  keyword,
  dateStart,
  dateEnd
) => {
  try {
    const result = await contextApi(
      `/akun/${id}/order/history/batch?startDate=${dateStart}&endDate=${dateEnd}&page=${page}&size=${size}&keyword=${keyword}&sortField=createdDate`,
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

export const GetDetailOrderHistory = async (
  idAkun,
  idOrder,
  page,
  size,
  keyword
) => {
  try {
    const result = await contextApi(
      `/akun/${idAkun}/order/history/batch/${idOrder}?page=${page}&size=${size}&keyword=${keyword}&sortField=createdDate`,
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

export const GetDetailOrderHistoryByDate = async (
  idAkun,
  idOrder,
  page,
  size,
  keyword,
  start,
  end
) => {
  try {
    const result = await contextApi(
      `/akun/${idAkun}/order/history/batch/${idOrder}?startDate=${start}&endDate=${end}&page=${page}&size=${size}&keyword=${keyword}&sortField=createdDate`,
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

export const DeleteOrderHistory = async (idAkun, alasan, resi) => {
  try {
    const result = await contextApi(
      `/pengiriman/${idAkun}/resi/cancel?alasan=${alasan}&resiId=${resi}`,
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
