import { RandomContactGenerator } from "./contact"
import { PhoneBook } from "./phone-book"
import { SendMessageToAllAlexes } from "./send-message-to-all-alexes"

class Program {
  protected readonly phoneBook = this.createPhoneBook()

  /** @ignore Helper for the example */
  protected createPhoneBook(): PhoneBook {
    const phoneBook = new PhoneBook()
  
    for (let i = 0; i < 10; i++) {
      const contact = RandomContactGenerator.generate()
  
      phoneBook.add(contact)
    }
  
    return phoneBook
  }

  protected writeToAlexes(message: string): void {
    const contacts = this.phoneBook.createIterable()
    const iterator = new SendMessageToAllAlexes(message, contacts)

    iterator.iterate()
  }

  main(): void {
    this.writeToAlexes('Hey, Big-L! Wanna hang out tonight?')
    this.writeToAlexes('Hey, bud, you good?')
  }
}

const program = new Program()

program.main()
