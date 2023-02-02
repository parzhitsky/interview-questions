export {}

abstract class HousePart {
  readonly name = this.constructor.name
}

class Fence extends HousePart {}

class SwimmingPool extends HousePart {}

class Porch extends HousePart {}

class House {
  private readonly parts: HousePart[] = []

  addPart(part: HousePart): void {
    this.parts.push(part)
  }
}

class HouseBuilder {
  private built = false

  constructor(private readonly house = new House()) {}

  addPart(part: HousePart): this {
    this.house.addPart(part)

    return this
  }

  build(): House {
    if (this.built) {
      throw new Error('Cannot reuse builder')
    }

    this.built = true

    return this.house
  }
}

export const house1: House = new House()
export const house2: House = new HouseBuilder().build()

export const houseWithFence: House = new HouseBuilder()
  .addPart(new Fence())
  .build()

export const houseWithPool: House = new HouseBuilder()
  .addPart(new SwimmingPool())
  .build()

export const houseWithPorch: House = new HouseBuilder()
  .addPart(new Porch())
  .build()

export const houseWithFenceAndPool: House = new HouseBuilder()
  .addPart(new Fence())
  .addPart(new SwimmingPool())
  .build()

export const houseWithPoolAndPorch: House = new HouseBuilder()
  .addPart(new SwimmingPool())
  .addPart(new Porch())
  .build()

export const houseWithPorchAndFence: House = new HouseBuilder()
  .addPart(new Porch())
  .addPart(new Fence())
  .build()

export const houseWithFenceAndPoolAndPorch: House = new HouseBuilder()
  .addPart(new Fence())
  .addPart(new SwimmingPool())
  .addPart(new Porch())
  .build()
