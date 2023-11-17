function utils() {}

function toFixed(number, floatPrecision) {
  var precision = floatPrecision != null ? floatPrecision : 2;
  var asFloat = parseFloat(number);
  return asFloat.toFixed(precision);
}
