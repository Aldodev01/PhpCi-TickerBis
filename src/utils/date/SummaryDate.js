import dateFilter from "./myDate";

var date = new Date();
let d = new Date();

date.setMonth(date.getMonth() - 1);
let mm = date.toLocaleDateString().split("/")[0];
let dd = date.toLocaleDateString().split("/")[1];
let yyyy = date.toLocaleDateString().split("/")[2];
export const getFirst = dd + "-" + mm + "-" + yyyy;
export const getLast = dateFilter?.basicDate(d).upNormal;

// var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
// var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

// var first = date.getDate() - date.getDay(); // First day is the day of the month - the day of the week
// var last = first + 6; // last day is the first day + 6

// var firstDayofWeek = new Date(date.setDate(first)).toUTCString();
// var lastdayOfWeek = new Date(date.setDate(last)).toUTCString();
// var dd = String(date.getDate()).padStart(2, "0");
// var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
// var yyyy = date.getFullYear();

// var today = dd + "-" + mm + "-" + yyyy;
// var monthAgo = date.setMonth(date.getMonth() - 1);
