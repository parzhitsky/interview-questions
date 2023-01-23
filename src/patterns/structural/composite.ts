export {}

class Box<Item> {
  private readonly entries: (Item | Box<Item>)[] = []

  add(...entry: (Item | Box<Item>)[]): this {
    this.entries.push(...entry)

    return this
  }

  *items(): IterableIterator<Item> {
    for (const entry of this.entries) {
      if (entry instanceof Box) {
        yield* entry.items()
      } else {
        yield entry
      }
    }
  }

  countItems(): number {
    let count = 0

    const items = this.items()

    while (!items.next().done) count++

    return count
  }
}

interface Thing {
  value?: unknown
}

const things = new Box<Thing>().add(
  { value: 42 },
  { value: 17 },
  new Box<Thing>().add(
    { value: 51 },
    { value: 33 },
    new Box<Thing>().add(
      { value: 29 },
      { value: 84 },
    ),
  )
)

console.log(`Total number of things in all boxes, including inner ones, is: ${things.countItems()}`)
