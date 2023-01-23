export {}

class ApplicationConfig {
  private static instance: ApplicationConfig | undefined

  readonly serverTimeout: number

  static getInstance(): ApplicationConfig {
    if (this.instance == null) {
      this.instance = new ApplicationConfig()
    }

    return this.instance
  }

  private constructor() {
    this.serverTimeout = Math.random() * 1000
  }
}

const config1 = ApplicationConfig.getInstance()
const config2 = ApplicationConfig.getInstance()

if (config1 === config2) {
  console.log(`The two config instances are the same object`)
} else {
  // should never happen
  console.log(`The two config instances are two different objects`)
}
