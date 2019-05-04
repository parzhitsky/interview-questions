export type InputArgs = [ boolean, boolean, boolean ];
export type Output = boolean;

/** performs ternary XOR logic operation */
export default function ternaryXor(...args: InputArgs): Output {
	const [ first, second, third ] = args;

	return first ? !second && !third : second !== third;
}
