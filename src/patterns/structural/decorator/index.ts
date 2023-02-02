export {}

function toPrintableTime(input: number): string {
  return input.toString().padStart(2, '0')
}

abstract class TimeLogFactory {
  abstract getTimeLog(date: Date): string
}

class TimeLogFactoryHoursMinutes extends TimeLogFactory {
  override getTimeLog(date: Date): string {
    const hours = toPrintableTime(date.getUTCHours())
    const minutes = toPrintableTime(date.getUTCMinutes())

    return `${hours}:${minutes}`
  }
}

abstract class TimeLogFactoryDecorator extends TimeLogFactory {
  constructor(protected readonly timeLogFactory: TimeLogFactory) {
    super()
  }

  override getTimeLog(date: Date): string {
    return this.timeLogFactory.getTimeLog(date)
  }
}

class TimeLogFactoryDecoratorDate extends TimeLogFactoryDecorator {
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

  override getTimeLog(date: Date): string {
    const year = date.getUTCFullYear()
    const month = date.getUTCMonth()
    const monthName = this.monthNames[month]
    const day = toPrintableTime(date.getUTCDate())
    const rest = super.getTimeLog(date)

    return `${monthName} ${day}, ${year}, ${rest}`
  }
}

class TimeLogFactoryDecoratorWeekDay extends TimeLogFactoryDecorator {
  private readonly weekDayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ] as const

  override getTimeLog(date: Date): string {
    const weekDay = date.getUTCDay()
    const weekDayName = this.weekDayNames[weekDay]
    const rest = super.getTimeLog(date)

    return `${weekDayName}, ${rest}`
  }
}

class TimeLogger {
  constructor(private readonly timeLogFactory: TimeLogFactory) {}

  logTime(): void {
    const date = new Date()
    const timeLog = this.timeLogFactory.getTimeLog(date)

    console.log(timeLog)
  }
}

new TimeLogger(
  new TimeLogFactoryHoursMinutes(),
).logTime() // 23:47

new TimeLogger(
  new TimeLogFactoryDecoratorWeekDay(
    new TimeLogFactoryHoursMinutes(),
  ),
).logTime() // Monday, 23:47

new TimeLogger(
  new TimeLogFactoryDecoratorDate(
    new TimeLogFactoryHoursMinutes(),
  ),
).logTime() // January 23, 2023, 23:47

new TimeLogger(
  new TimeLogFactoryDecoratorDate(
    new TimeLogFactoryDecoratorWeekDay(
      new TimeLogFactoryHoursMinutes(),
    ),
  ),
).logTime() // January 23, 2023, Monday, 23:47

new TimeLogger(
  new TimeLogFactoryDecoratorWeekDay(
    new TimeLogFactoryDecoratorDate(
      new TimeLogFactoryHoursMinutes(),
    ),
  ),
).logTime() // Monday, January 23, 2023, 23:47
