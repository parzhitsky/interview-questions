export {}

interface Result<Value = unknown> {
  readonly value: Value
  readonly pass: boolean
}

abstract class Handler<Input = unknown> {
  protected next?: Handler

  setNext(handler: Handler): void {
    this.next = handler
  }

  protected abstract doHandle(input: Input): Result

  handle(input: Input): Result {
    let result = this.doHandle(input)

    if (result.pass && this.next != null) {
      result = this.next.handle(result.value)
    }

    return result
  }
}

class HandlerNumberPassNonNegative extends Handler<number> {
  protected override doHandle(input: number): Result<number> {
    if (input >= 0) {
      return {
        value: input,
        pass: true,
      }
    }

    return {
      value: NaN,
      pass: false,
    }
  }
}

class HandlerNumberMultiplyBy extends Handler<number> {
  constructor(protected readonly operand: number) {
    super()
  }

  protected override doHandle(input: number): Result<number> {
    return {
      value: this.operand * input,
      pass: true
    }
  }
}

abstract class Process<Input = unknown, Output = unknown> {
  protected abstract readonly rootHandler: Handler

  abstract handle(input: Input): Output
}

class ProcessConvertNonNegativeToUAH extends Process<number, number> {
  protected readonly rootHandler: Handler<number>
  protected readonly currencyRates: Record<string, number> = { USD: 37 }

  constructor(protected readonly currencyCode: string) {
    super()

    const currencyRate = this.currencyRates[currencyCode]
    const passNonNegative = new HandlerNumberPassNonNegative()
    const multiplyByRate = new HandlerNumberMultiplyBy(currencyRate)

    passNonNegative.setNext(multiplyByRate)

    this.rootHandler = passNonNegative
  }

  handle(input: number): number {
    const result = this.rootHandler.handle(input)
    const output = result.value

    return output as number
  }
}

const convertToUAH = new ProcessConvertNonNegativeToUAH('USD')

const output37 = convertToUAH.handle(1)
const output370 = convertToUAH.handle(10)
const outputNaN = convertToUAH.handle(-5)

console.log({ output37, output370, outputNaN })
