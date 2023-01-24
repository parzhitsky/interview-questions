export {}

interface Message {
  body: string
}

abstract class Adapter<Input, Output> {
  constructor(protected readonly input: Input) {}

  abstract adapt(): Output
}

abstract class ToMessageAdapter<Input> extends Adapter<Input, Message> {
  protected readonly body = this.createBody()

  protected abstract createBody(): string

  override adapt(): Message {
    return {
      body: this.body,
    }
  }
}

class Person {
  constructor(public readonly name: string, public readonly age: number) {}
}

class Money {
  constructor(public readonly amount: number, public readonly currencyCode: string) {}
}

class Movie {
  constructor(public readonly title: string, public readonly director: string) {}
}

class PersonToMessageAdapter extends ToMessageAdapter<Person> {
  protected override createBody(): string {
    return `${this.input.name}, ${this.input.age} y.o.`
  }
}

class MoneyToMessageAdapter extends ToMessageAdapter<Money> {
  protected override createBody(): string {
    return `${this.input.amount} ${this.input.currencyCode}`
  }
}

class MovieToMessageAdapter extends ToMessageAdapter<Movie> {
  protected override createBody(): string {
    return `"${this.input.title}" by ${this.input.director}`
  }
}

class Chat {
  sendMessage(message: Message): void {
    console.log(`Sent message: "${message.body}"`)
  }
}

const chat = new Chat()

chat.sendMessage(
  new MoneyToMessageAdapter(
    new Money(1000, 'USD'),
  )
    .adapt(),
)

chat.sendMessage(
  new PersonToMessageAdapter(
    new Person('Jake', 32),
  )
    .adapt(),
)

chat.sendMessage(
  new MovieToMessageAdapter(
    new Movie('Titanic', 'James Cameron'),
  )
    .adapt(),
)
