export {}

abstract class Subscriber<Content> {
  abstract receive(content: Content): void
}

abstract class Publisher<Content> {
  protected readonly subscribers = new Set<Subscriber<Content>>()

  addSubscriber(subscriber: Subscriber<Content>): void {
    this.subscribers.add(subscriber)
  }

  broadcast(content: Content): void {
    for (const subscriber of this.subscribers) {
      subscriber.receive(content)
    }
  }
}

interface Article {
  title: string
  body: string
}

class Person {
  constructor(public readonly name: string) {}
}

class Reader extends Subscriber<Article> {
  protected readonly person: Person

  constructor(personName: string) {
    super()

    this.person = new Person(personName)
  }

  override receive(article: Article): void {
    console.log(`Reader ${this.person.name} received article "${article.title}": ${article.body}`)
  }
}

class Newspaper extends Publisher<Article> {
  constructor(public readonly name: string) {
    super()
  }

  override broadcast(article: Article): void {
    console.log(`Newspaper "${this.name}" broadcasts article "${article.title}"`)

    super.broadcast(article)
  }
}

const kyivPost = new Newspaper('Kyiv Post')
const nyt = new Newspaper('New York Times')

const dmytro = new Reader('Dmytro')
const maria = new Reader('Maria')
const alex = new Reader('Alex')

kyivPost.addSubscriber(dmytro)
kyivPost.addSubscriber(maria)
nyt.addSubscriber(dmytro)
nyt.addSubscriber(alex)

kyivPost.broadcast({
  title: 'article1',
  body: 'This is the first article',
})

nyt.broadcast({
  title: 'article2',
  body: 'This is the second article',
})
