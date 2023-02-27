import { Iterable } from "./iterable"

export interface Collection<Item> {
  add(item: Item): void
  createIterable(): Iterable<Item>
}
