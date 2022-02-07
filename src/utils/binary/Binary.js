// const ok = "aldodevv";
// console.log(ok.codePointAt(0).toString(16)); //   61: occupies < 1 byte

// const notOK = "✓";
// console.log(notOK.codePointAt(0).toString(16)); // 2713: occupies > 1 byte

// console.log(btoa(ok)); // YQ==
// console.log(btoa(notOK)); // error

/**
 * !STRING TO BINARY
 * @param {*} string
 * @returns
 */
// convert a Unicode string to a string in which
// each 16-bit unit occupies only one byte
export function toBinary(string) {
  const codeUnits = new Uint16Array(string.length);
  for (let i = 0; i < codeUnits.length; i++) {
    codeUnits[i] = string.charCodeAt(i);
  }
  const charCodes = new Uint8Array(codeUnits.buffer);
  let result = "";
  for (let i = 0; i < charCodes.byteLength; i++) {
    result += String.fromCharCode(charCodes[i]);
  }
  return result;
}

// a string that contains characters occupying > 1 byte
const myString = "☸☹☺☻☼☾☿";

const converted = toBinary(myString);
const encoded = btoa(converted);
// console.log("binary", converted);
// console.log("encodeed", encoded);

/**
 * !BINARY TO STRING
 * @param {*} string
 * @returns
 */
export function fromBinary(binary) {
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  const charCodes = new Uint16Array(bytes.buffer);
  let result = "";
  for (let i = 0; i < charCodes.length; i++) {
    result += String.fromCharCode(charCodes[i]);
  }
  return result;
}

const decoded = atob(encoded);
const original = fromBinary(decoded);
// console.log(decoded);
// console.log(original);
