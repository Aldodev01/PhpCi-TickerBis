export const patternEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const patternPassword = new RegExp(
  "^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9!@#$%^&*?)(+=._-]+)$"
);
export const patternNotelp = new RegExp(
  /(\+62 ((\d{3}([ -]\d{3,})([- ]\d{4,})?)|(\d+)))|(\(\d+\) \d+)|\d{3}( \d+)+|(\d+[ -]\d+)|\d+/gm
);

export const patternAlphabet = new RegExp("^[a-zA-Z][a-zA-Z0-9.,$;]+$");
export const patternNumberOnly = new RegExp("^[0-9]+$");
// export const partternIndoPhone = new RegExp(
//   "+62sd{3}[-.s]??d{3}[-.s]??d{3,4}|(0d{2,3})s?d+|0d{2,3}s?d{6,7}|+62s?361s?d+|+62d+|+62s?(?:d{3,}-)*d{3,5}"
// );
export const patternAlphaNumeric = new RegExp(/^[a-z\d\-_\s]+$/i);
// export const patternPhoneNumber = new RegExp(
//   "(+62 ((d{3}([ -]d{3,})([- ]d{4,})?)|(d+)))|((d+) d+)|d{3}( d+)+|(d+[ -]d+)|d+"
// );

export const patternFirstSpace1 = new RegExp(/^[^\s]+/);
export const patternFirstSpace2 = new RegExp(/(^[^\s]+).*?(\.\w+)$/);
