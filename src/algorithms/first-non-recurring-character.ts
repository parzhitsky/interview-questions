/** in a given string, find the first character, that occurs only once */
export default function firstNonRecurringCharacter(input: string): string {
	if (input.length) {
		const ocurrences: Record<string, number> = {};

		for (const char of input)
			if (char in ocurrences)
				ocurrences[char]++;

			else ocurrences[char] = 1;

		for (const char in ocurrences)
			if (ocurrences[char] === 1)
				return char;
	}

	return "";
};
