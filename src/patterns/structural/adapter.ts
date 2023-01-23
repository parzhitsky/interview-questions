export {}

interface Message {
  body: string
}

abstract class Adapter<Input, Output> {
  abstract adapt(input: Input): Output
}

abstract class ToMessageAdapter<Input> extends Adapter<Input, Message> {}

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
  adapt(person: Person): Message {
    return {
      body: `${person.name}, ${person.age} y.o.`,
    }
  }
}

class MoneyToMessageAdapter extends ToMessageAdapter<Money> {
  adapt(money: Money): Message {
    return {
      body: `${money.amount} ${money.currencyCode}`,
    }
  }
}

class MovieToMessageAdapter extends ToMessageAdapter<Movie> {
  adapt(movie: Movie): Message {
    return {
      body: `"${movie.title}" by ${movie.director}`,
    }
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
