/** in a given string, finds the first recurring character */
export default function firstRecurringCharacter(input: string): string {
	if (input.length) {
		const ocurred: Record<string, true> = {};

		for (const char of input)
			if (ocurred[char])
				return char;

			else ocurred[char] = true;
	}

	return "";
}
