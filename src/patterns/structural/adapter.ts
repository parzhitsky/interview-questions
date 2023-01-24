export {}

interface Message {
  body: string
}

abstract class Adapter<Input, Output> {
  abstract adapt(input: Input): Output
}

abstract class ToMessageAdapter<Input> extends Adapter<Input, Message> {
  protected abstract createBody(input: Input): string

  override adapt(input: Input): Message {
    return {
      body: this.createBody(input),
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
  protected override createBody(person: Person): string {
    return `${person.name}, ${person.age} y.o.`
  }
}

class MoneyToMessageAdapter extends ToMessageAdapter<Money> {
  protected override createBody(money: Money): string {
    return `${money.amount} ${money.currencyCode}`
  }
}

class MovieToMessageAdapter extends ToMessageAdapter<Movie> {
  protected override createBody(movie: Movie): string {
    return `"${movie.title}" by ${movie.director}`
  }
}

class Chat {
  sendMessage(message: Message): void {
    console.log(`Sent message: "${message.body}"`)
  }

  sendMessageViaAdapter<Input>(adapter: Adapter<Input, Message>, input: Input): void {
    const message = adapter.adapt(input)

    this.sendMessage(message)
  }
}

const chat = new Chat()

const personToMessageAdapter = new PersonToMessageAdapter()
const moneyToMessageAdapter = new MoneyToMessageAdapter()

chat.sendMessageViaAdapter(moneyToMessageAdapter, new Money(1000, 'USD'))
chat.sendMessageViaAdapter(personToMessageAdapter, new Person('Jake', 32))

const movieMessage = new MovieToMessageAdapter()
  .adapt(new Movie('Titanic', 'James Cameron'))

chat.sendMessage(movieMessage)
