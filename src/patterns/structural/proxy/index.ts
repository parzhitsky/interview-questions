import { randomUUID } from 'crypto'
import { createInterface } from 'readline'

function randomInt(max = 1, min = 0): number {
  return Math.floor(Math.random() * (max - min) + min)
}

function delay(msec: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, msec))
}

class AddNumberCommand {
  readonly id = randomUUID()
  readonly description = `${this.id} ${this.payload}`

  constructor(public readonly payload: number) {}
}

class Account {
  constructor(public balance = 0) {}

  async addAmount(amount: number): Promise<void> {
    await delay(randomInt(1000, 500)) // wait 0.5 to 1 sec to imitate true asynchronicity

    const nextBalance = this.balance + amount

    if (nextBalance < 0) {
      throw new AccountBalanceTooLowError(this.balance)
    }

    this.balance = nextBalance
  }
}

class AccountBalanceTooLowError extends Error {
  constructor(public readonly balance: number) {
    super(`Cannot perform command: balance is too low (${balance})`)
  }
}

class Queue<Item> {
  private readonly items: Item[] = []
  private nextIndex = 0

  get count(): number {
    return this.items.length - this.nextIndex
  }

  enqueue(item: Item): void {
    this.items.push(item)
  }

  peakNext(): Item | undefined {
    return this.items[this.nextIndex]
  }

  dequeue(): Item | undefined {
    const item = this.peakNext()

    if (this.nextIndex < this.items.length) {
      this.nextIndex += 1
    }

    return item
  }
}

class AccountDebounced extends Account {
  private readonly commands = new Queue<AddNumberCommand>()
  private commandsRunning = false

  private async runCommands(): Promise<void> {
    this.commandsRunning = true

    while (this.commands.count > 0) {
      const command = this.commands.dequeue()!

      try {
        console.log(`cmd:run ${command.id} ...`)
 
        await super.addAmount(command.payload)

        console.log(`cmd:okk ${command.id}: ${this.balance}`)
      } catch (error) {
        if (error instanceof AccountBalanceTooLowError) {
          console.error(`cmd:ERR ${command.id}: ${error.message}`)
        } else {
          throw error
        }
      }
    }

    this.commandsRunning = false
  }

  async addAmount(amount: number): Promise<void> {
    const command = new AddNumberCommand(amount)

    this.commands.enqueue(command)

    console.log(`cmd:add ${command.description}`)

    if (!this.commandsRunning) {
      await this.runCommands()
    }
  }
}

async function main(): Promise<void> {
  const account = new AccountDebounced(100)

  console.log(`Created an account: ${account.balance}`)
  console.log('Press <Enter> to generate a random command\n')

  for await (const line of createInterface(process.stdin, process.stdout)) {
    account.addAmount(randomInt(100, -150))
  }

  console.log(`\nAccount balance: ${account.balance}`)
}

main()
