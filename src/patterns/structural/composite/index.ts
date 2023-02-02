export {}

type Item<Value> = Value | Collection<Value>

class Collection<Value> {
  private readonly items: Item<Value>[] = []

  constructor(...items: Item<Value>[]) {
    this.items.push(...items)
  }

  *[Symbol.iterator](): IterableIterator<Value> {
    for (const item of this.items) {
      if (item instanceof Collection) {
        yield* item[Symbol.iterator]()
      } else {
        yield item
      }
    }
  }

  getCount(): number {
    let count = 0

    for (const value of this) count++

    return count
  }
}

class Thing {
  constructor(public readonly value = Math.random()) {}
}

const things = new Collection(
  new Thing(42),
  new Thing(17),
  new Collection(
    new Thing(51),
    new Thing(33),
    new Collection(
      new Thing(29),
      new Thing(84),
    ),
  )
)

console.log(`Total number of things in all boxes, including inner ones, is: ${things.getCount()}`)
