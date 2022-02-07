export default function currency(value, currency = "", separator = ".") {
  value = parseInt(value);

  const isNegative = value < 0;

  value = isNegative ? -1 * value : value;

  if (!Number.isInteger(value)) {
    return "";
  }

  value = String(value);

  const length = value.length;
  const step = length / 3;

  let array = [];

  for (let i = 0; i <= step; i++) {
    let a = i * 3;
    let b = (i + 1) * 3;
    array.unshift(value.substring(length - b, length - a));
  }

  let formatted = array.join(separator);

  if (formatted.charAt(0) === ".") {
    formatted = formatted.substring(1, formatted.length);
  }

  return isNegative ? "-" + currency + formatted : currency + formatted;
}
