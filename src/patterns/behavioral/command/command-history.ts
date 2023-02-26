import { Command } from "./command"

export class CommandHistory {
  protected readonly commands: Command[] = []

  exec(command: Command): void {
    command.execute()
    this.commands.push(command)
  }

  undo(): void {
    if (this.commands.length === 0) {
      return
    }

    const command = this.commands.pop()!

    command.revert()
  }
}
