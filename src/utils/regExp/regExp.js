export const patternEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const patternPassword = new RegExp(
  "^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9!@#$%^&*?)(+=._-]+)$"
);
export const patternNotelp = new RegExp(
  /(\+62 ((\d{3}([ -]\d{3,})([- ]\d{4,})?)|(\d+)))|(\(\d+\) \d+)|\d{3}( \d+)+|(\d+[ -]\d+)|\d+/gm
);

export const patternAlphabet = new RegExp("^[a-zA-Z][a-zA-Z0-9.,$;]+$");
// export const patternPhoneNumber = new RegExp(
//   "(+62 ((d{3}([ -]d{3,})([- ]d{4,})?)|(d+)))|((d+) d+)|d{3}( d+)+|(d+[ -]d+)|d+"
// );

export const patternFirstSpace1 = new RegExp(/^[^\s]+/);
export const patternFirstSpace2 = new RegExp(/(^[^\s]+).*?(\.\w+)$/);
