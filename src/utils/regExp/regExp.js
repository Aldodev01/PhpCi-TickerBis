export const patternEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const patternPassword = new RegExp(
  "^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9!@#$%^&*?)(+=._-]+)$"
);
export const patternNotelp = new RegExp(
  /(\+62 ((\d{3}([ -]\d{3,})([- ]\d{4,})?)|(\d+)))|(\(\d+\) \d+)|\d{3}( \d+)+|(\d+[ -]\d+)|\d+/gm
);
// export const patternPhoneNumber = new RegExp(
//   "(+62 ((d{3}([ -]d{3,})([- ]d{4,})?)|(d+)))|((d+) d+)|d{3}( d+)+|(d+[ -]d+)|d+"
// );
