export interface TestCase<
	InputArgs extends any[] = [],
	Output = unknown,
> {
	inputArgs: InputArgs;
	output: Output;
}
