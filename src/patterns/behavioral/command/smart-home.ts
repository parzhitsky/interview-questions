import { Color } from "./color"
import { CommandHistory } from "./command-history"
import { SetLightingCommand } from "./set-lighting-command"
import { SmartLightBulb } from "./smart-light-bulb"

export class SmartHome {
  protected readonly lightBulb = new SmartLightBulb()
  protected readonly history = new CommandHistory()

  protected readonly setRelaxingLightingCommand = new SetLightingCommand(
    this.lightBulb,
    1 / 3,
    new Color(255, 177, 110), // warm
  )

  protected readonly setWorkingLightingCommand = new SetLightingCommand(
    this.lightBulb,
    1,
    new Color(230, 235, 255), // cold
  )

  setRelaxingLighting(): void {
    this.history.exec(this.setRelaxingLightingCommand)
  }

  setWorkingLighting(): void {
    this.history.exec(this.setWorkingLightingCommand)
  }

  returnToLastScene(): void {
    this.history.undo()
  }
}
