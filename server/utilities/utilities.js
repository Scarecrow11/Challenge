// function for check string
const tryParseFloat = (str, defaultValue) => (new Boolean(str)) ? parseFloat(str) : defaultValue;

const tryParseInt= (str, defaultValue) => (new Boolean(str)) ? parseInt(str) : defaultValue;

export { tryParseInt, tryParseFloat};