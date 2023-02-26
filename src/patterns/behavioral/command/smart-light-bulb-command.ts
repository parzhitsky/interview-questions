import { Command } from "./command"
import { SmartLightBulb } from "./smart-light-bulb"

export abstract class SmartLightBulbCommand extends Command {
  constructor(protected readonly lightBulb: SmartLightBulb) {
    super()
  }
}
