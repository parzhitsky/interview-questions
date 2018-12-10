import "mocha";
import { expect } from "chai";
import { help } from "@valuer/help";

import digitsParsedWays from "./digits-parsed-ways";

type InputArgs = [ string ];
type Output = number;

const inputArgsList: InputArgs[] = [
	[ "22222" ],
	[ "12345" ],
	[ "12340" ],
	[ "98765" ],
	[ "120" ],
];

const outputs: Output[] = [
	8,
	3,
	0,
	1,
	1,
];

describe("digits-parsed-ways", () => {
	inputArgsList.forEach((inputArgs, index) => {
		it(`for (${ help.getPrintableList(inputArgs, true) }) outputs ${ help.getPrintable(outputs[index]) }`, () => {
			expect(digitsParsedWays(...inputArgs)).to.equal(outputs[index]);
		});
	});
});
