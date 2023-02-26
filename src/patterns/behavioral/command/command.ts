export abstract class Command {
  abstract execute(): void
  abstract revert(): void
}
