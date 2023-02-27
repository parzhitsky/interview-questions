export interface Iterable<Item> {
  getNext(): Item
  hasNext(): boolean
}
