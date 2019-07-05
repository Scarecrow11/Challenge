
const tryParseFloat = (str) => (new Boolean(str)) ? parseFloat(str) : false;

const tryParseInt= (str) => (new Boolean(str)) ? parseInt(str) : false;

export { tryParseInt, tryParseFloat, checkID, checkAuth };