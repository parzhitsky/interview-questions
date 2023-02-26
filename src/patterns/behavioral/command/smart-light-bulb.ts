import { Color } from "./color"
import { SmartDevice } from "./smart-device"

export class SmartLightBulb implements SmartDevice {
  protected readonly BRIGHTNESS_DEFAULT: number = 0.5
  protected readonly COLOR_DEFAULT = new Color(255, 255, 255)

  public brightness = this.BRIGHTNESS_DEFAULT
  public color = this.COLOR_DEFAULT

  get isOn(): boolean {
    return this.brightness > 0
  }

  setBrightness(brightness: number): void {
    this.brightness = brightness
  }

  setColor(color: Color): void {
    this.color = color
  }

  turnOn(): void {
    this.setBrightness(this.BRIGHTNESS_DEFAULT)
  }

  turnOff(): void {
    this.setBrightness(0)
  }
}
