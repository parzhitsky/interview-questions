export {}

abstract class AudioOutput {
  public readonly maxVolume: number = 100

  private _volume = 0

  public get volume() {
    return this._volume
  }

  public set volume(newVolume) {
    if (newVolume < 0 || newVolume > this.maxVolume) {
      console.log(`Cannot change ${this.constructor.name} volume: new value (${newVolume}) is out of bounds (0-${this.maxVolume})`)
      return
    }

    console.log(`${this.constructor.name} volume is changed from ${this._volume} to ${newVolume}`)

    this._volume = newVolume
  }
}

class AudioController {
  private volumeBeforeMuted: number | null = null

  constructor(private readonly output: AudioOutput) {}

  volumeUp(): void {
    this.output.volume += 1
  }

  volumeDown(): void {
    this.output.volume -= 1
  }

  mute(): void {
    this.volumeBeforeMuted = this.output.volume
    this.output.volume = 0
  }

  unmute(): void {
    if (this.volumeBeforeMuted != null) {
      this.output.volume = this.volumeBeforeMuted
      this.volumeBeforeMuted = null
    } else {
      console.log(`Cannot unmute ${this.output.constructor.name}: output device is not muted`)
    }
  }
}

class Speakers extends AudioOutput {}

class HeadPhones extends AudioOutput {
  override readonly maxVolume: number = 80
}

const speakersController = new AudioController(new Speakers())
const headPhonesController = new AudioController(new HeadPhones())

speakersController.volumeUp() // 1
speakersController.volumeUp() // 2
speakersController.volumeUp() // 3
speakersController.volumeUp() // 4
speakersController.volumeUp() // 5
speakersController.mute() // 0
speakersController.unmute() // 5
speakersController.volumeDown() // 4
speakersController.volumeDown() // 3
speakersController.volumeDown() // 2
speakersController.volumeDown() // 1
speakersController.volumeDown() // 0
speakersController.volumeDown() // Error!
speakersController.volumeUp() // 1
speakersController.volumeUp() // 2

headPhonesController.volumeUp() // 1
headPhonesController.volumeUp() // 2
headPhonesController.volumeUp() // 3
headPhonesController.volumeUp() // 4
headPhonesController.volumeUp() // 5
headPhonesController.volumeUp() // 6
headPhonesController.volumeUp() // 7
headPhonesController.volumeUp() // 8
headPhonesController.volumeUp() // 9
headPhonesController.volumeDown() // 8
headPhonesController.volumeDown() // 7
headPhonesController.volumeDown() // 6
headPhonesController.unmute() // Error!
headPhonesController.mute() // 0
headPhonesController.volumeDown() // Error!
headPhonesController.unmute() // 6
