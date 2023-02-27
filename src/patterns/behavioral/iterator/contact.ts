export class Contact {
  constructor(
    public readonly name: string,
    public readonly phone: string,
  ) {}

  sendMessage(message: string): void {
    console.log(`Sent message to ${this.name} on ${this.phone}: "${message}"`)
  }
}

/** @ignore Helper for the example */
export namespace RandomContactGenerator {
  const firstNames = ["Alex", "Emily", "Marcus", "Olivia", "Ryan", "Samantha", "Sarah", "Thomas"]
  const lastNames = ["Johnson", "Miller", "Anderson", "Brown", "Wright", "Lee", "Perez", "Martinez", "Thompson", "Davis"]

  function getRandomItem<Item>(items: Item[]): Item {
    const index = Math.floor(Math.random() * items.length)
    const name = items[index]

    return name
  }

  function getRandomPhone(): string {
    const digits = Array.from({ length: 4 }, () => Math.round(Math.random() * 9))
    const chunk = digits.join("")
    const phone = `(555) 555-${chunk}`

    return phone
  }

  export function generate(): Contact {
    const isAlex = Math.random() > 0.5
    const firstName = isAlex ? "Alex" : getRandomItem(firstNames)
    const lastName = getRandomItem(lastNames)
    const name = `${firstName} ${lastName}`
    const phone = getRandomPhone()
    const contact = new Contact(name, phone)

    return contact
  }
}
