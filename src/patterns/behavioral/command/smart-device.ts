export interface SmartDevice {
  readonly isOn: boolean

  turnOn(): void
  turnOff(): void
}
