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
    console.log('setRelaxingLighting()')

    this.history.exec(this.setRelaxingLightingCommand)
  }

  setWorkingLighting(): void {
    console.log('setWorkingLighting()')

    this.history.exec(this.setWorkingLightingCommand)
  }

  returnToLastScene(): void {
    console.log('returnToLastScene()')

    this.history.undo()
  }
}
