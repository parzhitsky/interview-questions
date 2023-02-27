import { Command } from "./command"

export class CommandHistory {
  protected readonly commands: Command[] = []

  exec(command: Command): void {
    console.log(`executing command "${command.name}"`)

    command.execute()
    this.commands.push(command)
  }

  undo(): void {
    if (this.commands.length === 0) {
      console.warn('no commands to undo')

      return
    }

    const command = this.commands.pop()!

    console.log(`reverting command "${command.name}"`)

    command.revert()
  }
}
