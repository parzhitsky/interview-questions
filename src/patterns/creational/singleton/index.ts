export {}

class Config {
  private static instance?: Config

  static getInstance(): Config {
    if (this.instance == null) {
      this.instance = new this()
    }

    return this.instance
  }

  eventTimestamp = 1392847200000

  private constructor() {}
}

function getEventDate(): Date {
  const { eventTimestamp } = Config.getInstance()

  const date = new Date(eventTimestamp)

  return date
}

const config = Config.getInstance()

console.log(getEventDate())

config.eventTimestamp = 1645671600000

console.log(getEventDate())
