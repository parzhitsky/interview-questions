module.exports = (kebab = "kebab-case-identifier", descr = "*no description*", camel = require("camelcase")(kebab)) =>
`/** ${ descr } */
export default function ${ camel }(input?: unknown): unknown {
	// ...
};
`;
