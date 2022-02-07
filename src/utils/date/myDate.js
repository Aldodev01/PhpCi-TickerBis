export const dateConfig = {
  monthNames: [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ],
  monthNamesShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ],
  dayNames: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"],
  dayNamesShort: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
};

const getTimezone = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset();

  const H = offset > 0 ? Math.floor(offset / 60) : Math.round(offset / 60);
  const hh =
    H > 0
      ? H < 10
        ? "-0" + H
        : "-" + H
      : H * -1 < 10
      ? "+0" + H * -1
      : "+" + H * -1;

  const M = offset > 0 ? offset % 60 : (offset % 60) * -1;
  const mm = M < 10 ? "0" + M : M;

  let timezone;

  switch (now.getHours() - now.getUTCHours()) {
    case 7:
      timezone = "WIB";
      break;
    case 8:
      timezone = "WITA";
      break;
    case 9:
      timezone = "WIT";
    default:
      timezone = " ";
      break;
  }

  return {
    isoTimezone: `${hh}:${mm}`,
    timezone,
  };
};

const getDate = (date) => {
  const day = dateConfig.dayNames[date.getDay()];
  const dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const mm = dateConfig.monthNames[date.getMonth()];
  const yyyy = date.getFullYear();

  return `${dd} ${mm} ${yyyy}`;
};

const getDateTime = (date) => {
  const day = dateConfig.dayNames[date.getDay()];
  const dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const mm = dateConfig.monthNames[date.getMonth()];
  const yyyy = date.getFullYear();
  const hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  const MM =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  const ss =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

  return `${dd} ${mm} ${yyyy} ${hh}:${MM}:${ss}`;
};

const getFullDate = (date) => {
  const day = dateConfig.dayNames[date.getDay()];
  const dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const mm = dateConfig.monthNames[date.getMonth()];
  const yyyy = date.getFullYear();

  return `${day}, ${dd} ${mm} ${yyyy}`;
};

const getTime = (date) => {
  const hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  const MM =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

  return `${hh}:${MM}`;
};

const basicDate = (date) => {
  const dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const mm =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  const yyyy = date.getFullYear();

  return {
    noSpace: `${yyyy}${mm}${dd}`,
    normal: `${yyyy}-${mm}-${dd}`,
    upNormal: `${dd}-${mm}-${yyyy}`,
  };
};

const dateFilter = {
  basicDate,
  getDate,
  getDateTime,
  getFullDate,
  getTime,
  getTimezone,
};

export default dateFilter;
