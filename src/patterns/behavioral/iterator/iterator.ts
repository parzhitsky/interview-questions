import { Iterable } from "./iterable";

export abstract class Iterator<Item> {
  constructor(protected readonly iterable: Iterable<Item>) {}

  protected abstract handle(item: Item): boolean

  iterate(): void {
    while (this.iterable.hasNext()) {
      const item = this.iterable.getNext()
      const done = this.handle(item)

      if (done) {
        break
      }
    }
  }
}
