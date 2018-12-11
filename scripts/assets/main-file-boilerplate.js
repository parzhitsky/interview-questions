module.exports = (kebab = "kebab-case-identifier", descr = "", camel = require("camelcase")(kebab)) =>
`${ descr ? `/** ${ descr } */\n` : "" }export default function ${ camel }(input?: unknown): unknown {
	// ...
};
`;
