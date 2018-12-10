module.exports = (kebab = "kebab-case-identifier", descr = "") =>
`${ descr ? `/** ${ descr } */\n` : "" }export default function ${ require("camelcase")(kebab) }(input?: unknown): unknown {
	// ...
};
`;
