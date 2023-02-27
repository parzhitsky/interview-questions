import { Contact } from "./contact"
import { Iterable } from "./iterable"

/** @private */
interface OrderedCollection<Item> {
  readonly length: number
  [index: number]: Item
}

export class ContactIterable implements Iterable<Contact> {
  protected nextIndex = 0

  constructor(protected readonly contacts: OrderedCollection<Contact>) {}

  getNext(): Contact {
    const next = this.contacts[this.nextIndex]

    this.nextIndex += 1

    return next
  }

  hasNext(): boolean {
    return this.nextIndex < this.contacts.length - 1
  }
}
