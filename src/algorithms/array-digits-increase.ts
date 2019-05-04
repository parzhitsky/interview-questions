export type InputArgs = [ number[] ];
export type Output = number[]

/** increases a number represented by an array of digits by one */
export default function arrayDigitsIncrease(...args: InputArgs): Output {
	const [ digits ] = args;

	const newDigits: number[] = Array(digits.length);

	if (digits.length) {
		let shouldIncrease = true;

		for (let index = digits.length - 1; index >= 0; index--) {
			let newDigit = digits[index];

			if (shouldIncrease)
				newDigit++;

			shouldIncrease = newDigit === 10;
			newDigits[index] = newDigit % 10;
		}

		if (shouldIncrease)
			newDigits.unshift(1);
	}

	return newDigits;
}
