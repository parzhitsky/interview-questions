export {}

function randomFloat(max = 1, min = 0): number {
  return Math.random() * (max - min) + min
}

function randomInt(max?: number, min?: number): number {
  return Math.floor(randomFloat(max, min))
}

function delay(msec = 1000): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, msec))
}

interface AddNumberCommand {
  readonly operand: number
}

class Account {
  constructor(public readonly currencyCode: string, private amount = 0) {}

  toString(): string {
    return `${this.amount} ${this.currencyCode}`
  }

  async addAmount(command: AddNumberCommand): Promise<void> {
    const nextAmount = this.amount + command.operand
    const rejected = nextAmount < 0
    const operandMagnitude = Math.abs(command.operand)
    const operationName = command.operand > 0 ? 'Add ' : 'Withdraw '
    const rejection = rejected ? '-- (REJECTED: LOW BALANCE) ' : ''

    console.log(`\t${rejection + operationName + operandMagnitude} ${this.currencyCode}`)

    if (rejected) {
      return
    }

    await delay(randomInt(500)) // wait up to 500 msec to imitate true asynchronicity

    this.amount = nextAmount
  }
}

class Queue<Item> {
  private readonly items: Item[] = []
  private nextIndex = 0

  enqueue(item: Item): void {
    this.items.push(item)
  }

  dequeue(): Item | undefined {
    const item = this.items[this.nextIndex]

    this.nextIndex += 1

    return item
  }

  [Symbol.iterator](): IterableIterator<Item> {
    return this.items.slice(this.nextIndex).values()
  }
}

class AccountController {
  private readonly commands = new Queue<AddNumberCommand>()
  private commandsRunning = false

  constructor(public readonly account: Account) {}

  async runCommands(): Promise<void> {
    this.commandsRunning = true

    for (const command of this.commands) {
      await this.account.addAmount(command)

      this.commands.dequeue()
    }

    this.commandsRunning = false
  }

  async addAmount(command: AddNumberCommand): Promise<void> {
    this.commands.enqueue(command)

    if (!this.commandsRunning) {
      await this.runCommands()
    }
  }
}

const accountController = new AccountController(
  new Account('UAH', 100),
)

console.log(`Created an account: ${accountController.account}`)

const burstyAccountCommands = [
  { operand: -88 }, // :: 12
  { operand: -10 }, // :: 2
  { operand: -19 }, // REJECTED
  { operand: -91 }, // REJECTED
  { operand: +93 }, // :: 95
  { operand: +99 }, // :: 194
  { operand: -81 }, // :: 113
  { operand: -17 }, // :: 96
  { operand: -65 }, // :: 31
  { operand: -51 }, // REJECTED
] satisfies AddNumberCommand[]

async function main(): Promise<void> {
  for (const command of burstyAccountCommands) {
    await accountController.addAmount(command)
  }

  console.log(`Account balance: ${accountController.account}`)
}

main()
