import { Color } from "./color"
import { SmartLightBulb } from "./smart-light-bulb"
import { SmartLightBulbCommand } from "./smart-light-bulb-command"

export class SetLightingCommand extends SmartLightBulbCommand {
  protected prevBrightness?: number
  protected prevColor?: Color

  constructor(
    lightBulb: SmartLightBulb,
    protected readonly nextBrightness?: number,
    protected readonly nextColor?: Color,
  ) {
    super(lightBulb)
  }

  execute(): void {
    if (this.nextBrightness != null) {
      this.prevBrightness = this.lightBulb.brightness
      this.lightBulb.brightness = this.nextBrightness
    }

    if (this.nextColor != null) {
      this.prevColor = this.lightBulb.color
      this.lightBulb.color = this.nextColor
    }
  }

  revert(): void {
    if (this.prevBrightness != null) {
      this.lightBulb.brightness = this.prevBrightness
    }

    if (this.prevColor != null) {
      this.lightBulb.color = this.prevColor
    }
  }
}
