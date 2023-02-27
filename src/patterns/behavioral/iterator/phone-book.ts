import { Collection } from "./collection"
import { Contact } from "./contact"
import { ContactIterable } from "./contact-iterable"

export class PhoneBook implements Collection<Contact> {
  protected readonly contacts = new Set<Contact>()

  add(contact: Contact): void {
    this.contacts.add(contact)
  }

  createIterable(): ContactIterable {
    const contacts = Array.from(this.contacts.values())

    return new ContactIterable(contacts)
  }
}
