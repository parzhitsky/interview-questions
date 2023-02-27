export abstract class Command {
  readonly name = this.constructor.name

  abstract execute(): void
  abstract revert(): void
}
