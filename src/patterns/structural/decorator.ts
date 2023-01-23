export {}

function toTimeComponent(input: number): string {
  return input.toString().padStart(2, '0')
}

abstract class TimeFactory {
  readonly date = new Date()

  abstract getTime(): string
}

class TimeFactoryHoursMinutes extends TimeFactory {
  getTime(): string {
    const hours = toTimeComponent(this.date.getUTCHours())
    const minutes = toTimeComponent(this.date.getUTCMinutes())

    return `${hours}:${minutes}`
  }
}

abstract class TimeFactoryDecorator extends TimeFactory {
  constructor(protected readonly timeFactory: TimeFactory) {
    super()
  }

  getTime(): string {
    return this.timeFactory.getTime()
  }
}

class TimeFactoryDecoratorDate extends TimeFactoryDecorator {
  private readonly monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ] as const

  override getTime(): string {
    const year = this.timeFactory.date.getUTCFullYear()
    const month = this.timeFactory.date.getUTCMonth()
    const monthName = this.monthNames[month]
    const day = toTimeComponent(this.timeFactory.date.getUTCDate())
    const rest = super.getTime()

    return `${monthName} ${day}, ${year}, ${rest}`
  }
}

class TimeFactoryDecoratorDayOfWeek extends TimeFactoryDecorator {
  private readonly dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ] as const

  override getTime(): string {
    const day = this.timeFactory.date.getUTCDay()
    const dayName = this.dayNames[day]
    const rest = super.getTime()

    return `${dayName}, ${rest}`
  }
}

class TimeLogger {
  logTime(timeFactory: TimeFactory): void {
    const time = timeFactory.getTime()

    console.log(time)
  }
}

const timeLogger = new TimeLogger()

timeLogger.logTime(
  new TimeFactoryHoursMinutes(),
)
// 23:47

timeLogger.logTime(
  new TimeFactoryDecoratorDayOfWeek(
    new TimeFactoryHoursMinutes(),
  ),
)
// Monday, 23:47

timeLogger.logTime(
  new TimeFactoryDecoratorDate(
    new TimeFactoryHoursMinutes(),
  ),
)
// January 23, 2023, 23:47

timeLogger.logTime(
  new TimeFactoryDecoratorDate(
    new TimeFactoryDecoratorDayOfWeek(
      new TimeFactoryHoursMinutes(),
    ),
  ),
)
// January 23, 2023, Monday, 23:47

timeLogger.logTime(
  new TimeFactoryDecoratorDayOfWeek(
    new TimeFactoryDecoratorDate(
      new TimeFactoryHoursMinutes(),
    ),
  ),
)
// Monday, January 23, 2023, 23:47
