import { Contact } from "./contact"
import { Iterable } from "./iterable"
import { Iterator } from "./iterator"

export class SendMessageToAllAlexes extends Iterator<Contact> {
  constructor(protected readonly message: string, contacts: Iterable<Contact>) {
    super(contacts)
  }

  protected override handle(contact: Contact): boolean {
    if (contact.name.includes('Alex')) {
      contact.sendMessage(this.message)
    }

    return false
  }
}
