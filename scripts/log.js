const { red } = require("chalk");

const warn = console.warn.bind(console, red("[WARN]:"));
const info = console.info.bind(console, "[INFO]:");

module.exports = { warn, info };
